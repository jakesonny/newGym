import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { WorkoutRecord, WorkoutType } from '../../entities/workout-record.entity';
import { Member } from '../../entities/member.entity';
import { User } from '../../entities/user.entity';
import { PTUsage } from '../../entities/pt-usage.entity';
import { Exercise } from '../../entities/exercise.entity';
import { CreateWorkoutRecordDto } from './dto/create-workout-record.dto';
import { UpdateWorkoutRecordDto } from './dto/update-workout-record.dto';
import { WorkoutVolumeQueryDto, VolumePeriod } from './dto/workout-volume-query.dto';
import { ApiExceptions } from '../../common/exceptions';
import { PTSessionsService } from './pt-sessions.service';
import { MembersService } from './members.service';
import { WorkoutHelper } from '../../common/utils/workout-helper';
import { PTUsageHelper } from '../../common/utils/pt-usage-helper';
import { QueryBuilderHelper } from '../../common/utils/query-builder-helper';
import { DateRangeHelper } from '../../common/utils/date-range-helper';
import { EntityUpdateHelper } from '../../common/utils/entity-update-helper';
import { RepositoryHelper } from '../../common/utils/repository-helper';
import { OneRepMaxCalculator, OneRepMaxFormula } from '../../common/utils/one-rep-max-calculator';
import { RelativeStrengthCalculator } from '../../common/utils/relative-strength-calculator';
import { StrengthLevelEvaluator } from '../../common/utils/strength-level-evaluator';
import { WorkoutRecordHelper } from '../../common/utils/workout-record-helper';
import { StrengthStandard } from '../../entities/strength-standard.entity';

@Injectable()
export class WorkoutRecordsService {
	private readonly logger = new Logger(WorkoutRecordsService.name);

	private readonly majorExerciseMapping = {
		'벤치프레스': ['벤치프레스', 'Bench Press', 'Chest Press', '체스트 프레스'],
		'스쿼트': ['스쿼트', 'Squat', 'Leg Press', '레그 프레스'],
		'데드리프트': ['데드리프트', 'Deadlift', 'Romanian Deadlift', '로마니안 데드리프트'],
	};

	constructor(
		@InjectRepository(WorkoutRecord)
		private workoutRecordRepository: Repository<WorkoutRecord>,
		@InjectRepository(Member)
		private memberRepository: Repository<Member>,
		@InjectRepository(User)
		private userRepository: Repository<User>,
		@InjectRepository(PTUsage)
		private ptUsageRepository: Repository<PTUsage>,
		@InjectRepository(Exercise)
		private exerciseRepository: Repository<Exercise>,
		@InjectRepository(StrengthStandard)
		private strengthStandardRepository: Repository<StrengthStandard>,
		@Inject(forwardRef(() => PTSessionsService))
		private ptSessionsService: PTSessionsService,
		@Inject(forwardRef(() => MembersService))
		private membersService: MembersService,
		private strengthLevelEvaluator: StrengthLevelEvaluator,
	) {}

	async findAll(
		identifier: { memberId?: string; userId?: string },
		page: number = 1,
		pageSize: number = 10,
		startDate?: string,
		endDate?: string,
	): Promise<{ records: WorkoutRecord[]; total: number }> {
		const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');

		if (identifier.memberId) {
			await RepositoryHelper.ensureMemberExists(this.memberRepository, identifier.memberId, this.logger);
			QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', identifier.memberId);
		} else if (identifier.userId) {
			queryBuilder.andWhere('record.userId = :userId', { userId: identifier.userId });
		} else {
			throw ApiExceptions.badRequest('회원 ID 또는 사용자 ID가 필요합니다.');
		}

		QueryBuilderHelper.addOrderBy(queryBuilder, 'record.workoutDate', 'DESC');
		QueryBuilderHelper.addAdditionalOrderBy(queryBuilder, 'record.createdAt', 'DESC');
		QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);

		const total = await queryBuilder.getCount();
		QueryBuilderHelper.addPagination(queryBuilder, page, pageSize);
		const records = await queryBuilder.getMany();

		return { records, total };
	}

	async findOne(id: string, identifier: { memberId?: string; userId?: string }): Promise<WorkoutRecord> {
		const where: any = { id };
		if (identifier.memberId) where.memberId = identifier.memberId;
		if (identifier.userId) where.userId = identifier.userId;

		return RepositoryHelper.findOneOrFailSimple(
			this.workoutRecordRepository,
			where,
			this.logger,
			'운동 기록',
		);
	}

	async create(
		identifier: { memberId?: string; userId: string },
		createDto: CreateWorkoutRecordDto,
	): Promise<WorkoutRecord> {
		if (identifier.memberId) {
			await RepositoryHelper.ensureMemberExists(this.memberRepository, identifier.memberId, this.logger);
		}

		const workoutType = createDto.workoutType ?? WorkoutType.PERSONAL;
		const { weight, reps, sets, volume } = WorkoutHelper.normalizeWorkoutValues(
			createDto.weight,
			createDto.reps,
			createDto.sets,
		);

		let ptSessionId = createDto.ptSessionId;
		if (workoutType === WorkoutType.PT && !ptSessionId && identifier.memberId) {
			const ptUsage = await PTUsageHelper.getLatestPTUsage(this.ptUsageRepository, identifier.memberId);
			PTUsageHelper.validatePTUsage(ptUsage, identifier.memberId, this.logger);

			await PTUsageHelper.deductPTUsage(
				this.ptUsageRepository,
				ptUsage!,
				new Date(createDto.workoutDate),
				this.logger,
				identifier.memberId,
			);

			try {
				const ptSession = await this.ptSessionsService.create(identifier.memberId, {
					sessionDate: createDto.workoutDate,
					mainContent: `${createDto.exerciseName} - ${createDto.bodyPart}`,
					trainerComment: createDto.trainerComment,
				});
				ptSessionId = ptSession.id;
			} catch (error) {
				await PTUsageHelper.restorePTUsage(this.ptUsageRepository, ptUsage, this.logger, identifier.memberId);
				throw ApiExceptions.badRequest(`PT 세션 생성에 실패했습니다: ${error.message}`);
			}
		}

		const recordData = EntityUpdateHelper.convertDateFields(
			{
				userId: identifier.userId,
				memberId: identifier.memberId,
				workoutDate: createDto.workoutDate,
				bodyPart: createDto.bodyPart,
				exerciseName: createDto.exerciseName,
				weight,
				reps,
				sets,
				volume,
				workoutType,
				ptSessionId,
				trainerComment: createDto.trainerComment,
				duration: createDto.duration,
			},
			['workoutDate'],
		);

		const record = this.workoutRecordRepository.create(recordData);

		if (weight > 0 && reps > 0) {
			const oneRepMaxResult = OneRepMaxCalculator.calculate(weight, reps);
			record.oneRepMax = oneRepMaxResult.oneRepMax;

			let userWeight = 0;
			if (identifier.memberId) {
				const member = await this.memberRepository.findOne({ where: { id: identifier.memberId } });
				userWeight = member?.weight || 0;
				if (userWeight > 0) {
					record.relativeStrength = (record.oneRepMax / userWeight) * 100;
					const level = await this.strengthLevelEvaluator.evaluate(
						record.exerciseName,
						record.oneRepMax,
						member.weight,
						member.gender as any,
						member.age,
					);
					record.strengthLevel = level as any;
				}
			}
		}

		return this.workoutRecordRepository.save(record);
	}

	async update(
		id: string,
		identifier: { memberId?: string; userId?: string },
		updateDto: UpdateWorkoutRecordDto,
	): Promise<WorkoutRecord> {
		const record = await this.findOne(id, identifier);

		if (updateDto.weight !== undefined || updateDto.reps !== undefined || updateDto.sets !== undefined) {
			const weight = updateDto.weight ?? record.weight;
			const reps = updateDto.reps ?? record.reps;
			const sets = updateDto.sets ?? record.sets;

			const { volume } = WorkoutHelper.normalizeWorkoutValues(weight, reps, sets);
			record.volume = volume;

			if (weight > 0 && reps > 0) {
				const oneRepMaxResult = OneRepMaxCalculator.calculate(weight, reps);
				record.oneRepMax = oneRepMaxResult.oneRepMax;

				if (record.memberId) {
					const member = await this.memberRepository.findOne({ where: { id: record.memberId } });
					if (member && member.weight > 0) {
						record.relativeStrength = (record.oneRepMax / member.weight) * 100;
						const level = await this.strengthLevelEvaluator.evaluate(
							updateDto.exerciseName ?? record.exerciseName,
							record.oneRepMax,
							member.weight,
							member.gender as any,
							member.age,
						);
						record.strengthLevel = level as any;
					}
				}
			}
		}

		EntityUpdateHelper.updateFieldsWithDateConversion(record, updateDto, ['workoutDate']);
		return this.workoutRecordRepository.save(record);
	}

	async remove(id: string, identifier: { memberId?: string; userId?: string }): Promise<void> {
		const record = await this.findOne(id, identifier);
		await this.workoutRecordRepository.remove(record);
	}

	async getCalendar(memberId: string, startDate: string, endDate: string) {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
		const start = new Date(startDate);
		const end = new Date(endDate);

		const records = await this.workoutRecordRepository.find({
			where: {
				memberId,
				workoutDate: Between(start, end),
			},
			select: ['workoutDate'],
		});

		const dateMap = new Map<string, number>();
		records.forEach((r) => {
			const dateStr = r.workoutDate.toISOString().split('T')[0];
			dateMap.set(dateStr, (dateMap.get(dateStr) || 0) + 1);
		});

		const result = [];
		const curr = new Date(start);
		while (curr <= end) {
			const dateStr = curr.toISOString().split('T')[0];
			result.push({
				date: dateStr,
				hasWorkout: dateMap.has(dateStr),
				workoutCount: dateMap.get(dateStr) || 0,
			});
			curr.setDate(curr.getDate() + 1);
		}

		return result;
	}

	async getVolumeByBodyPart(memberId: string, query: WorkoutVolumeQueryDto) {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
		
		const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
		queryBuilder.select('record.bodyPart', 'bodyPart');
		queryBuilder.addSelect('SUM(record.volume)', 'totalVolume');
		queryBuilder.addSelect('COUNT(DISTINCT record.workoutDate)', 'workoutCount');
		queryBuilder.addSelect('SUM(record.volume) / COUNT(DISTINCT record.workoutDate)', 'averageVolume');
		queryBuilder.where('record.memberId = :memberId', { memberId });
		
		const { startDate, endDate } = DateRangeHelper.getRangeFromPeriod(query.period as any);
		QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
		queryBuilder.groupBy('record.bodyPart');
		
		const results = await queryBuilder.getRawMany();
		return results.map(r => ({
			bodyPart: r.bodyPart,
			totalVolume: parseFloat(r.totalVolume),
			workoutCount: parseInt(r.workoutCount),
			averageVolume: parseFloat(r.averageVolume),
		}));
	}

	async getVolumeAnalysis(memberId: string, period: 'WEEKLY' | 'MONTHLY', startDate?: string, endDate?: string) {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
		
		const currentRange = DateRangeHelper.getRangeFromPeriod(period === 'MONTHLY' ? 'month' : 'week');
		const prevRange = DateRangeHelper.getPreviousRange(currentRange.startDate, currentRange.endDate);
		
		const [currentVolume, prevVolume] = await Promise.all([
			this.getTotalVolume(memberId, currentRange.startDate, currentRange.endDate),
			this.getTotalVolume(memberId, prevRange.startDate, prevRange.endDate),
		]);
		
		return {
			period,
			current: currentVolume,
			previous: prevVolume,
			changeRate: prevVolume > 0 ? ((currentVolume - prevVolume) / prevVolume) * 100 : 0,
		};
	}

	private async getTotalVolume(memberId: string, startDate: string, endDate: string): Promise<number> {
		const result = await this.workoutRecordRepository
			.createQueryBuilder('record')
			.select('SUM(record.volume)', 'total')
			.where('record.memberId = :memberId', { memberId })
			.andWhere('record.workoutDate BETWEEN :start AND :end', { start: startDate, end: endDate })
			.getRawOne();
			
		return parseFloat(result.total || '0');
	}

	async getOneRepMaxTrend(memberId: string, exerciseName?: string, startDate?: string, endDate?: string) {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
		QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
		if (exerciseName) {
			queryBuilder.andWhere(
				'(record.exerciseName = :exerciseName OR record.exerciseName = :exerciseNameEn)',
				{ exerciseName, exerciseNameEn: exerciseName },
			);
		}
		QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
		queryBuilder.orderBy('record.workoutDate', 'ASC').addOrderBy('record.createdAt', 'ASC');

		const records = await queryBuilder.getMany();
		const dateMap = WorkoutRecordHelper.groupByDateWithMaxOneRM(records);

		const trend = Array.from(dateMap.entries()).map(([date, info]) => ({
			date,
			oneRepMax: info.oneRepMax,
			strengthLevel: info.strengthLevel,
		}));

		return { exerciseName: exerciseName || undefined, trend };
	}

	async getVolumeTrend(memberId: string, startDate?: string, endDate?: string, bodyPart?: string) {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
		queryBuilder.select('record.workoutDate', 'date');
		queryBuilder.addSelect('SUM(record.volume)', 'totalVolume');
		queryBuilder.where('record.memberId = :memberId', { memberId });
		if (bodyPart) {
			queryBuilder.andWhere('record.bodyPart = :bodyPart', { bodyPart });
		}
		QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
		queryBuilder.groupBy('record.workoutDate');
		queryBuilder.orderBy('record.workoutDate', 'ASC');

		const results = await queryBuilder.getRawMany();
		return {
			bodyPart: bodyPart || undefined,
			trend: results.map(r => ({
				date: r.date.toISOString().split('T')[0],
				totalVolume: parseFloat(r.totalVolume),
			})),
		};
	}

	async getTrends(memberId: string, type: 'oneRm' | 'volume', exerciseName?: string, startDate?: string, endDate?: string) {
		if (type === 'oneRm') {
			const result = await this.getOneRepMaxTrend(memberId, exerciseName, startDate, endDate);
			return {
				type: 'oneRm',
				exerciseName: result.exerciseName,
				data: result.trend.map(t => ({ date: t.date, value: t.oneRepMax })),
			};
		} else {
			const result = await this.getVolumeTrend(memberId, startDate, endDate, exerciseName);
			return {
				type: 'volume',
				exerciseName: result.bodyPart,
				data: result.trend.map(t => ({ date: t.date, value: t.totalVolume })),
			};
		}
	}

	async getStrengthProgress(memberId: string, exerciseName?: string) {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
		const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
		queryBuilder.where('record.memberId = :memberId', { memberId });
		if (exerciseName) {
			queryBuilder.andWhere('record.exerciseName = :exerciseName', { exerciseName });
		}
		queryBuilder.andWhere('record.oneRepMax IS NOT NULL');
		queryBuilder.orderBy('record.workoutDate', 'ASC');

		const records = await queryBuilder.getMany();
		return records.map(r => ({
			date: DateRangeHelper.toDateString(r.workoutDate),
			level: r.strengthLevel,
			oneRepMax: r.oneRepMax,
		}));
	}

	async getMajorExercisesOneRepMax(memberId: string): Promise<{
		exercises: Array<{
			exerciseName: string;
			exerciseNameEn: string;
			category: 'UPPER' | 'LOWER' | 'FULL_BODY';
			isSubstitute: boolean;
			current: {
				oneRepMax: number;
				relativeStrength: number;
				strengthLevel: string | null;
				workoutDate: string;
			} | null;
			best: {
				oneRepMax: number;
				relativeStrength: number;
				strengthLevel: string | null;
				workoutDate: string;
			} | null;
			history: Array<{
				oneRepMax: number;
				workoutDate: string;
				strengthLevel: string | null;
			}>;
		}>;
	}> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
		const member = await this.memberRepository.findOne({ where: { id: memberId } });
		if (!member || !member.weight) throw ApiExceptions.badRequest('회원의 체중 정보가 필요합니다.');

		const result = [];
		for (const [majorExerciseName, exerciseNames] of Object.entries(this.majorExerciseMapping)) {
			let matchedExercise = null;
			let records = [];
			for (const name of exerciseNames) {
				records = await this.workoutRecordRepository.find({
					where: { memberId, exerciseName: name },
					order: { workoutDate: 'DESC' },
				});
				if (records.length > 0) {
					matchedExercise = name;
					break;
				}
			}

			if (!matchedExercise) continue;

			const current = records[0];
			const best = records.reduce((max, r) => (r.oneRepMax > (max?.oneRepMax || 0) ? r : max), null);

			result.push({
				exerciseName: majorExerciseName,
				exerciseNameEn: matchedExercise,
				category: majorExerciseName === '벤치프레스' ? 'UPPER' : 'LOWER',
				isSubstitute: matchedExercise !== majorExerciseName,
				current: {
					oneRepMax: current.oneRepMax,
					relativeStrength: current.relativeStrength,
					strengthLevel: current.strengthLevel,
					workoutDate: DateRangeHelper.toDateString(current.workoutDate),
				},
				best: {
					oneRepMax: best.oneRepMax,
					relativeStrength: best.relativeStrength,
					strengthLevel: best.strengthLevel,
					workoutDate: DateRangeHelper.toDateString(best.workoutDate),
				},
				history: records.map(r => ({
					oneRepMax: r.oneRepMax,
					workoutDate: DateRangeHelper.toDateString(r.workoutDate),
					strengthLevel: r.strengthLevel,
				})),
			});
		}
		return { exercises: result as any };
	}

	async getOneRepMaxEstimate(memberId: string) {
		const majorResult = await this.getMajorExercisesOneRepMax(memberId);
		return majorResult;
	}
}
