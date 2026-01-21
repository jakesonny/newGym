import { Injectable, Logger, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { WorkoutRecord, WorkoutType } from '../../entities/workout-record.entity';
import { Member } from '../../entities/member.entity';
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

	constructor(
		@InjectRepository(WorkoutRecord)
		private workoutRecordRepository: Repository<WorkoutRecord>,
		@InjectRepository(Member)
		private memberRepository: Repository<Member>,
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
		memberId: string,
		page: number = 1,
		pageSize: number = 10,
		startDate?: string,
		endDate?: string,
	): Promise<{ records: WorkoutRecord[]; total: number }> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		const queryBuilder = this.workoutRecordRepository
			.createQueryBuilder('record');

		QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
		QueryBuilderHelper.addOrderBy(queryBuilder, 'record.workoutDate', 'DESC');
		QueryBuilderHelper.addAdditionalOrderBy(queryBuilder, 'record.createdAt', 'DESC');
		QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);

		const total = await queryBuilder.getCount();
		QueryBuilderHelper.addPagination(queryBuilder, page, pageSize);
		const records = await queryBuilder.getMany();

		return { records, total };
	}

	async findOne(id: string, memberId: string): Promise<WorkoutRecord> {
		return RepositoryHelper.findOneOrFailByMemberId(
			this.workoutRecordRepository,
			id,
			memberId,
			this.logger,
			'운동 기록',
		);
	}

	async create(
		memberId: string,
		createDto: CreateWorkoutRecordDto,
	): Promise<WorkoutRecord> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		// workoutType 기본값 처리
		const workoutType = createDto.workoutType ?? WorkoutType.PERSONAL;

		// weight, reps, sets 기본값 처리 및 볼륨 계산
		const { weight, reps, sets, volume } = WorkoutHelper.normalizeWorkoutValues(
			createDto.weight,
			createDto.reps,
			createDto.sets,
		);

		// PT 타입이고 ptSessionId가 없으면 자동으로 PT 세션 생성 및 횟수 차감
		let ptSessionId = createDto.ptSessionId;
		if (workoutType === WorkoutType.PT && !ptSessionId) {
			const ptUsage = await PTUsageHelper.getLatestPTUsage(this.ptUsageRepository, memberId);
			PTUsageHelper.validatePTUsage(ptUsage, memberId, this.logger);

			// PT 횟수 차감
			await PTUsageHelper.deductPTUsage(
				this.ptUsageRepository,
				ptUsage!,
				new Date(createDto.workoutDate),
				this.logger,
				memberId,
			);

			// PT 세션 자동 생성
			try {
				const ptSession = await this.ptSessionsService.create(memberId, {
					sessionDate: createDto.workoutDate,
					mainContent: `${createDto.exerciseName} - ${createDto.bodyPart}`,
					trainerComment: createDto.trainerComment,
				});

				ptSessionId = ptSession.id;
				this.logger.log(
					`PT 운동 기록 생성 시 자동으로 PT 세션 생성됨: ${ptSessionId} (MemberId: ${memberId})`,
				);
			} catch (error) {
				// PT 세션 생성 실패 시 횟수 복구
				await PTUsageHelper.restorePTUsage(this.ptUsageRepository, ptUsage, this.logger, memberId);
				this.logger.error(
					`PT 세션 자동 생성 실패. PT 횟수 복구됨: ${error.message} (MemberId: ${memberId})`,
				);
				throw ApiExceptions.badRequest(
					`PT 세션 생성에 실패했습니다: ${error.message}`,
				);
			}
		}

		// 날짜 필드 변환
		const recordData = EntityUpdateHelper.convertDateFields(
			{
				memberId,
				workoutDate: createDto.workoutDate,
				bodyPart: createDto.bodyPart,
				exerciseName: createDto.exerciseName,
				weight,
				reps,
				sets,
				volume,
				duration: createDto.duration,
				workoutType,
				ptSessionId,
				trainerComment: createDto.trainerComment,
			},
			['workoutDate'],
		);

		const record = this.workoutRecordRepository.create(recordData);

		// Strength Level 자동 계산
		await this.calculateStrengthLevel(record, memberId);

		return this.workoutRecordRepository.save(record);
	}

	async update(
		id: string,
		memberId: string,
		updateDto: UpdateWorkoutRecordDto,
	): Promise<WorkoutRecord> {
		const record = await this.findOne(id, memberId);

		// 업데이트할 필드 적용
		EntityUpdateHelper.updateFieldsWithDateConversion(record, updateDto, ['workoutDate']);

		// 볼륨 재계산 (weight, reps, sets 중 하나라도 변경되었을 수 있음)
		record.volume = WorkoutHelper.calculateVolume(record.weight, record.reps, record.sets);

		// Strength Level 재계산 (weight, reps가 변경되었을 수 있음)
		await this.calculateStrengthLevel(record, memberId);

		return this.workoutRecordRepository.save(record);
	}

	async remove(id: string, memberId: string): Promise<void> {
		const record = await this.findOne(id, memberId);

		// PT 타입이고 ptSessionId가 있으면 PT 세션도 삭제하고 횟수 복구
		if (record.workoutType === WorkoutType.PT && record.ptSessionId) {
			try {
				await this.ptSessionsService.remove(record.ptSessionId, memberId);
				const ptUsage = await PTUsageHelper.getLatestPTUsage(this.ptUsageRepository, memberId);
				await PTUsageHelper.restorePTUsage(this.ptUsageRepository, ptUsage, this.logger, memberId);
			} catch (error) {
				this.logger.error(
					`PT 세션 삭제 실패: ${error.message} (MemberId: ${memberId}, SessionId: ${record.ptSessionId})`,
				);
			}
		}

		await this.workoutRecordRepository.remove(record);
	}

	/**
	 * 부위별 볼륨 조회 (주간/월간)
	 */
	async getVolumeByBodyPart(
		memberId: string,
		query: WorkoutVolumeQueryDto,
	): Promise<{
		period: VolumePeriod;
		bodyPartVolumes: Array<{ bodyPart: string; volume: number }>;
		totalVolume: number;
	}> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		const period = query.period || VolumePeriod.WEEK;
		const { start: startDate, end: endDate } = period === VolumePeriod.WEEK
			? DateRangeHelper.getWeekRange()
			: DateRangeHelper.getMonthRange();

		const records = await this.workoutRecordRepository.find({
			where: { memberId, workoutDate: Between(startDate, endDate) },
		});

		const volumeMap = WorkoutHelper.aggregateByBodyPart(records);
		const bodyPartVolumes = Array.from(volumeMap.entries())
			.map(([bodyPart, data]) => ({
				bodyPart,
				volume: WorkoutHelper.roundToTwo(data.volume),
			}))
			.sort((a, b) => b.volume - a.volume);

		const totalVolume = bodyPartVolumes.reduce((sum, item) => sum + item.volume, 0);

		return {
			period,
			bodyPartVolumes,
			totalVolume: WorkoutHelper.roundToTwo(totalVolume),
		};
	}

	/**
	 * 부위별 볼륨 분석 (주간/월간) - 프론트엔드 요청사항 반영
	 */
	async getVolumeAnalysis(
		memberId: string,
		period?: 'WEEKLY' | 'MONTHLY',
		startDate?: string,
		endDate?: string,
	): Promise<{
		weekly?: {
			period: 'WEEKLY';
			startDate: string;
			endDate: string;
			bodyPartVolumes: Array<{
				bodyPart: string;
				totalVolume: number;
				totalSets: number;
				totalReps: number;
				recordCount: number;
			}>;
		};
		monthly?: {
			period: 'MONTHLY';
			startDate: string;
			endDate: string;
			bodyPartVolumes: Array<{
				bodyPart: string;
				totalVolume: number;
				totalSets: number;
				totalReps: number;
				recordCount: number;
			}>;
		};
	}> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		const result: any = {};

		// 주간 분석
		if (!period || period === 'WEEKLY') {
			const { start: weekStart, end: weekEnd } = DateRangeHelper.getWeekRange();
			const weeklyRecords = await this.workoutRecordRepository.find({
				where: { memberId, workoutDate: Between(weekStart, weekEnd) },
			});

			const weeklyMap = WorkoutHelper.aggregateByBodyPart(weeklyRecords);
			result.weekly = {
				period: 'WEEKLY',
				startDate: DateRangeHelper.formatDateString(weekStart),
				endDate: DateRangeHelper.formatDateString(weekEnd),
				bodyPartVolumes: WorkoutHelper.volumeMapToResults(weeklyMap),
			};
		}

		// 월간 분석
		if (!period || period === 'MONTHLY') {
			const { start: monthStart, end: monthEnd } = DateRangeHelper.getMonthRange();
			const monthlyRecords = await this.workoutRecordRepository.find({
				where: { memberId, workoutDate: Between(monthStart, monthEnd) },
			});

			const monthlyMap = WorkoutHelper.aggregateByBodyPart(monthlyRecords);
			result.monthly = {
				period: 'MONTHLY',
				startDate: DateRangeHelper.formatDateString(monthStart),
				endDate: DateRangeHelper.formatDateString(monthEnd),
				bodyPartVolumes: WorkoutHelper.volumeMapToResults(monthlyMap),
			};
		}

		return result;
	}

	/**
	 * 운동 캘린더 조회 - 프론트엔드 요청사항 반영
	 */
	async getCalendar(
		memberId: string,
		startDate: string,
		endDate: string,
	): Promise<{
		events: Array<{
			date: string;
			ptSessions: number;
			selfWorkouts: number;
		}>;
		startDate: string;
		endDate: string;
	}> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		// PT 세션 조회
		const ptSessions = await this.memberRepository.manager.query(
			`
			SELECT 
				session_date as "sessionDate",
				COUNT(*) as count
			FROM pt_sessions
			WHERE member_id = $1
				AND session_date >= $2
				AND session_date <= $3
			GROUP BY session_date
		`,
			[memberId, startDate, endDate],
		);

		// 개인 운동 조회
		const selfWorkouts = await this.memberRepository.manager.query(
			`
			SELECT 
				workout_date as "workoutDate",
				COUNT(*) as count
			FROM workout_records
			WHERE member_id = $1
				AND workout_type = 'PERSONAL'
				AND workout_date >= $2
				AND workout_date <= $3
			GROUP BY workout_date
		`,
			[memberId, startDate, endDate],
		);

		// 날짜별로 그룹화
		const dateMap = new Map<string, { ptSessions: number; selfWorkouts: number }>();

		ptSessions.forEach((item: any) => {
			const date = item.sessionDate;
			if (!dateMap.has(date)) {
				dateMap.set(date, { ptSessions: 0, selfWorkouts: 0 });
			}
			dateMap.get(date)!.ptSessions = parseInt(item.count);
		});

		selfWorkouts.forEach((item: any) => {
			const date = item.workoutDate;
			if (!dateMap.has(date)) {
				dateMap.set(date, { ptSessions: 0, selfWorkouts: 0 });
			}
			dateMap.get(date)!.selfWorkouts = parseInt(item.count);
		});

		const events = Array.from(dateMap.entries()).map(([date, data]) => ({
			date,
			ptSessions: data.ptSessions,
			selfWorkouts: data.selfWorkouts,
		}));

		return {
			events,
			startDate,
			endDate,
		};
	}

	/**
	 * Strength Level 자동 계산 및 저장
	 * @param record WorkoutRecord 엔티티
	 * @param memberId 회원 ID
	 */
	private async calculateStrengthLevel(record: WorkoutRecord, memberId: string): Promise<void> {
		try {
			// 회원 정보 조회 (체중, 성별 필요)
			const member = await this.memberRepository.findOne({
				where: { id: memberId },
			});

			if (!member) {
				this.logger.warn(`회원을 찾을 수 없습니다: ${memberId}`);
				return;
			}

			// 체중이나 성별이 없으면 계산 불가
			if (!member.weight || !member.gender) {
				this.logger.debug(
					`체중 또는 성별 정보가 없어 Strength Level 계산을 건너뜁니다. (MemberId: ${memberId})`,
				);
				return;
			}

			// 운동명으로 Exercise 찾기 (한글명/영문명 모두 지원)
			const exercise = await this.exerciseRepository.findOne({
				where: [
					{ name: record.exerciseName },
					{ nameEn: record.exerciseName },
				],
			});

			if (!exercise) {
				this.logger.debug(
					`운동을 찾을 수 없어 Strength Level 계산을 건너뜁니다. (ExerciseName: ${record.exerciseName})`,
				);
				return;
			}

			// 1RM 계산
			const oneRepMaxResult = OneRepMaxCalculator.calculate(
				record.weight,
				record.reps,
				OneRepMaxFormula.EPLEY,
			);

			// 상대적 강도 계산
			const relativeStrengthResult = RelativeStrengthCalculator.calculate(
				oneRepMaxResult.oneRepMax,
				member.weight,
			);

			// Strength Level 판정
			const evaluationResult = await this.strengthLevelEvaluator.evaluate(
				exercise.id,
				oneRepMaxResult.oneRepMax,
				member.weight,
				member.gender,
				member.age, // 나이 파라미터 추가
			);

			// 결과 저장
			record.oneRepMax = oneRepMaxResult.oneRepMax;
			record.relativeStrength = relativeStrengthResult.relativeStrength;
			record.strengthLevel = evaluationResult.level || undefined;

			this.logger.debug(
				`Strength Level 계산 완료: ${record.exerciseName} - 1RM: ${oneRepMaxResult.oneRepMax}kg, 상대적 강도: ${relativeStrengthResult.relativeStrength}%, 레벨: ${evaluationResult.level || 'N/A'}`,
			);
		} catch (error) {
			// 계산 실패해도 운동 기록 저장은 계속 진행
			this.logger.error(
				`Strength Level 계산 중 오류 발생: ${error.message} (MemberId: ${memberId}, ExerciseName: ${record.exerciseName})`,
			);
		}
	}

	/**
	 * 3대 운동 및 대체 운동 매핑
	 */
	private readonly majorExerciseMapping = {
		벤치프레스: ['벤치프레스', 'Bench Press', '인클라인 벤치프레스', 'Incline Bench Press', '덤벨 프레스', 'Dumbbell Press'],
		스쿼트: ['스쿼트', 'Squat', '레그프레스', 'Leg Press', '스플릿 스쿼트', 'Split Squat'],
		데드리프트: ['데드리프트', 'Deadlift', '루마니안 데드리프트', 'Romanian Deadlift', '스모 데드리프트', 'Sumo Deadlift'],
	};

	/**
	 * 주요 운동(3대 운동)의 1RM 조회
	 * 3대 운동 기록이 없을 경우 대체 운동 자동 탐색
	 */
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

		const member = await this.memberRepository.findOne({
			where: { id: memberId },
		});

		if (!member || !member.weight) {
			throw ApiExceptions.badRequest('회원의 체중 정보가 필요합니다.');
		}

		const result: Array<{
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
		}> = [];

		// 3대 운동 순회
		for (const [majorExerciseName, exerciseNames] of Object.entries(this.majorExerciseMapping)) {
			// 원본 운동부터 대체 운동까지 순서대로 조회
			let matchedExercise: { name: string; nameEn: string; category: string } | null = null;
			let isSubstitute = false;

			// 원본 운동 기록 조회
			for (let i = 0; i < exerciseNames.length; i++) {
				const exerciseName = exerciseNames[i];
				const records = await this.workoutRecordRepository.find({
					where: {
						memberId,
						exerciseName,
					},
					order: {
						workoutDate: 'DESC',
						createdAt: 'DESC',
					},
				});

				if (records.length > 0) {
					// 운동 정보 조회
					const exercise = await this.exerciseRepository.findOne({
						where: [
							{ name: exerciseName },
							{ nameEn: exerciseName },
						],
					});

					if (exercise) {
						matchedExercise = {
							name: exercise.name,
							nameEn: exercise.nameEn,
							category: exercise.category,
						};
						isSubstitute = i > 0; // 첫 번째가 아니면 대체 운동
						break;
					}
				}
			}

			// 기록이 없으면 다음 운동으로
			if (!matchedExercise) {
				continue;
			}

			// 해당 운동의 모든 기록 조회
			const allRecords = await this.workoutRecordRepository.find({
				where: {
					memberId,
					exerciseName: matchedExercise.name,
				},
				order: {
					workoutDate: 'ASC',
					createdAt: 'ASC',
				},
			});

			// 1RM이 있는 기록만 필터링
			const recordsWith1RM = allRecords.filter((r) => r.oneRepMax !== null && r.oneRepMax !== undefined);

			if (recordsWith1RM.length === 0) {
				continue;
			}

			// 히스토리 생성
			const history = recordsWith1RM.map((record) => ({
				oneRepMax: record.oneRepMax!,
				workoutDate: record.workoutDate.toISOString().split('T')[0],
				strengthLevel: record.strengthLevel || null,
			}));

			// 현재 (가장 최근) 기록
			const currentRecord = recordsWith1RM[recordsWith1RM.length - 1];
			const current = currentRecord
				? {
						oneRepMax: currentRecord.oneRepMax!,
						relativeStrength: currentRecord.relativeStrength || (currentRecord.oneRepMax! / member.weight) * 100,
						strengthLevel: currentRecord.strengthLevel || null,
						workoutDate: currentRecord.workoutDate.toISOString().split('T')[0],
					}
				: null;

			// 최고 기록
			const bestRecord = recordsWith1RM.reduce((best, record) => {
				if (!best || (record.oneRepMax! > best.oneRepMax!)) {
					return record;
				}
				return best;
			}, null as typeof recordsWith1RM[0] | null);

			const best = bestRecord
				? {
						oneRepMax: bestRecord.oneRepMax!,
						relativeStrength: bestRecord.relativeStrength || (bestRecord.oneRepMax! / member.weight) * 100,
						strengthLevel: bestRecord.strengthLevel || null,
						workoutDate: bestRecord.workoutDate.toISOString().split('T')[0],
					}
				: null;

			result.push({
				exerciseName: matchedExercise.name,
				exerciseNameEn: matchedExercise.nameEn,
				category: matchedExercise.category as 'UPPER' | 'LOWER' | 'FULL_BODY',
				isSubstitute,
				current,
				best,
				history,
			});
		}

		return { exercises: result };
	}

	/**
	 * 1RM 추정 API (플랜 Phase 3)
	 * 빅3 운동의 최신/최고 1RM과 히스토리 조회
	 */
	async getOneRepMaxEstimate(memberId: string): Promise<{
		exercises: Array<{
			exerciseName: string;
			latest: { oneRepMax: number; strengthLevel: string | null; workoutDate: string } | null;
			max: { oneRepMax: number; workoutDate: string } | null;
			history: Array<{ oneRepMax: number; workoutDate: string; strengthLevel?: string | null }>;
		}>;
	}> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		const exerciseNames = [
			['벤치프레스', 'Bench Press'],
			['스쿼트', 'Squat'],
			['데드리프트', 'Deadlift'],
		];

		const result = await Promise.all(
			exerciseNames.map(async ([primaryName, englishName]) => {
				const records = await this.workoutRecordRepository.find({
					where: [
						{ memberId, exerciseName: primaryName },
						{ memberId, exerciseName: englishName },
					],
					order: { workoutDate: 'ASC', createdAt: 'ASC' },
				});

				const recordsWith1RM = WorkoutRecordHelper.filterRecordsWithOneRM(records);

				if (recordsWith1RM.length === 0) {
					return { exerciseName: primaryName, latest: null, max: null, history: [] };
				}

				const history = WorkoutRecordHelper.buildHistory(recordsWith1RM);
				const latestRecord = WorkoutRecordHelper.getLatestRecord(recordsWith1RM);
				const maxRecord = WorkoutRecordHelper.getBestRecord(recordsWith1RM);

				return {
					exerciseName: primaryName,
					latest: latestRecord ? WorkoutRecordHelper.toOneRepMaxInfo(latestRecord) : null,
					max: maxRecord ? { oneRepMax: maxRecord.oneRepMax!, workoutDate: DateRangeHelper.toDateString(maxRecord.workoutDate) } : null,
					history,
				};
			}),
		);

		return { exercises: result };
	}

	/**
	 * 1RM 추세 그래프 API (플랜 Phase 4)
	 */
	async getOneRepMaxTrend(
		memberId: string,
		exerciseName?: string,
		startDate?: string,
		endDate?: string,
	): Promise<{
		exerciseName?: string;
		trend: Array<{ date: string; oneRepMax: number; strengthLevel?: string | null }>;
	}> {
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

	/**
	 * 볼륨 추세 그래프 API (플랜 Phase 5)
	 */
	async getVolumeTrend(
		memberId: string,
		startDate?: string,
		endDate?: string,
		bodyPart?: string,
	): Promise<{
		trend: Array<{
			date: string;
			totalVolume: number;
			bodyPartVolumes?: Array<{ bodyPart: string; volume: number }>;
		}>;
	}> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
		QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
		QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);

		if (bodyPart) {
			queryBuilder.andWhere('record.bodyPart = :bodyPart', { bodyPart });
		}

		queryBuilder.orderBy('record.workoutDate', 'ASC').addOrderBy('record.createdAt', 'ASC');
		const records = await queryBuilder.getMany();

		const dateMap = WorkoutRecordHelper.groupByDateWithVolume(records);

		const trend = Array.from(dateMap.entries()).map(([date, data]) => {
			const result: {
				date: string;
				totalVolume: number;
				bodyPartVolumes?: Array<{ bodyPart: string; volume: number }>;
			} = {
				date,
				totalVolume: WorkoutHelper.roundToTwo(data.totalVolume),
			};

			if (!bodyPart && data.bodyPartMap.size > 0) {
				result.bodyPartVolumes = Array.from(data.bodyPartMap.entries()).map(
					([bp, volume]) => ({ bodyPart: bp, volume: WorkoutHelper.roundToTwo(volume) }),
				);
			}

			return result;
		});

		return { trend };
	}

	/**
	 * 운동 기록 추세 데이터 조회 (1RM 또는 볼륨)
	 */
	async getTrends(
		memberId: string,
		type: 'one_rm' | 'volume',
		exerciseName?: string,
		startDate?: string,
		endDate?: string,
	): Promise<{
		type: 'one_rm' | 'volume';
		exerciseName?: string;
		data: Array<{ date: string; value: number; strengthLevel?: string | null }>;
	}> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		const queryBuilder = this.workoutRecordRepository.createQueryBuilder('record');
		QueryBuilderHelper.addMemberIdFilter(queryBuilder, 'record.memberId', memberId);
		if (exerciseName) {
			queryBuilder.andWhere('record.exerciseName = :exerciseName', { exerciseName });
		}
		QueryBuilderHelper.addDateRangeFilter(queryBuilder, 'record.workoutDate', startDate, endDate);
		queryBuilder.orderBy('record.workoutDate', 'ASC').addOrderBy('record.createdAt', 'ASC');

		const records = await queryBuilder.getMany();

		let data: Array<{ date: string; value: number; strengthLevel?: string | null }>;

		if (type === 'one_rm') {
			const dateMap = WorkoutRecordHelper.groupByDateWithMaxOneRM(records);
			data = Array.from(dateMap.entries()).map(([date, info]) => ({
				date,
				value: info.oneRepMax,
				strengthLevel: info.strengthLevel,
			}));
		} else {
			const dateMap = WorkoutRecordHelper.groupByDateWithVolume(records);
			data = Array.from(dateMap.entries()).map(([date, info]) => ({
				date,
				value: WorkoutHelper.roundToTwo(info.totalVolume),
			}));
		}

		return { type, exerciseName: exerciseName || undefined, data };
	}

	/**
	 * 회원의 운동별 Strength Level 변화 추적
	 */
	async getStrengthProgress(
		memberId: string,
		exerciseName?: string,
	): Promise<{
		exerciseName?: string;
		history: Array<{
			oneRepMax: number | null;
			relativeStrength: number | null;
			strengthLevel: string | null;
			workoutDate: string;
		}>;
		current?: {
			oneRepMax: number | null;
			relativeStrength: number | null;
			strengthLevel: string | null;
		};
	}> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);

		const where: any = { memberId };
		if (exerciseName) where.exerciseName = exerciseName;

		const records = await this.workoutRecordRepository.find({
			where,
			order: { workoutDate: 'ASC', createdAt: 'ASC' },
		});

		const history = records.map((record) => ({
			oneRepMax: record.oneRepMax || null,
			relativeStrength: record.relativeStrength || null,
			strengthLevel: record.strengthLevel || null,
			workoutDate: DateRangeHelper.toDateString(record.workoutDate),
		}));

		return {
			exerciseName: exerciseName || undefined,
			history,
			current: history.length > 0 ? history[history.length - 1] : undefined,
		};
	}
}

