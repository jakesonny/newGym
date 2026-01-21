import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { PTSession } from '../../entities/pt-session.entity';
import { Member } from '../../entities/member.entity';
import { Membership } from '../../entities/membership.entity';
import { CreatePTSessionDto } from './dto/create-pt-session.dto';
import { UpdatePTSessionDto } from './dto/update-pt-session.dto';
import { ApiExceptions } from '../../common/exceptions';
import { EntityUpdateHelper } from '../../common/utils/entity-update-helper';
import { RepositoryHelper } from '../../common/utils/repository-helper';
import { ProgressCalculator } from '../../common/utils/progress-calculator';

@Injectable()
export class PTSessionsService {
	private readonly logger = new Logger(PTSessionsService.name);

	constructor(
		@InjectRepository(PTSession)
		private ptSessionRepository: Repository<PTSession>,
		@InjectRepository(Member)
		private memberRepository: Repository<Member>,
		@InjectRepository(Membership)
		private membershipRepository: Repository<Membership>,
		private dataSource: DataSource,
	) {}

	async findAll(memberId: string): Promise<{
		sessions: PTSession[];
		total: number;
		totalSessions: number;
		completedSessions: number;
	}> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
		const member = await this.memberRepository.findOne({ where: { id: memberId } });

		const sessions = await this.ptSessionRepository.find({
			where: { memberId },
			order: { sessionNumber: 'DESC' },
		});

		return {
			sessions,
			total: sessions.length,
			totalSessions: member.totalSessions,
			completedSessions: member.completedSessions,
		};
	}

	async findOne(id: string, memberId: string): Promise<PTSession> {
		return RepositoryHelper.findOneOrFailByMemberId(
			this.ptSessionRepository,
			id,
			memberId,
			this.logger,
			'PT 세션',
		);
	}

	/**
	 * 다음 세션 번호 계산
	 */
	private async getNextSessionNumber(memberId: string): Promise<number> {
		const lastSession = await this.ptSessionRepository.findOne({
			where: { memberId },
			order: { sessionNumber: 'DESC' },
		});

		return lastSession ? lastSession.sessionNumber + 1 : 1;
	}

	async create(
		memberId: string,
		createDto: CreatePTSessionDto,
	): Promise<PTSession> {
		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		try {
			const member = await queryRunner.manager.findOne(Member, { where: { id: memberId } });
			if (!member) {
				throw new Error('회원을 찾을 수 없습니다.');
			}

			// 다음 세션 번호 계산
			const sessionNumber = await this.getNextSessionNumber(memberId);

			// 세션 데이터 준비 (측정값 포함)
			const sessionData: Partial<PTSession> = {
				memberId,
				sessionNumber,
				mainContent: createDto.mainContent,
				trainerComment: createDto.trainerComment,
				sessionDate: new Date(createDto.sessionDate),
				membershipId: createDto.membershipId,
				// 측정값
				measuredWeight: createDto.measuredWeight,
				measuredMuscleMass: createDto.measuredMuscleMass,
				measuredBodyFat: createDto.measuredBodyFat,
				benchPress1RM: createDto.benchPress1RM,
				squat1RM: createDto.squat1RM,
				deadlift1RM: createDto.deadlift1RM,
				stepTestTime: createDto.stepTestTime,
			};

			const session = queryRunner.manager.create(PTSession, sessionData);
			const savedSession = await queryRunner.manager.save(PTSession, session);

			// completedSessions 자동 증가
			member.completedSessions += 1;

			// 목표 진행률 자동 업데이트
			if (member.totalSessions > 0) {
				member.goalProgress = Math.round(
					(member.completedSessions / member.totalSessions) * 100,
				);
				if (member.goalProgress > 100) {
					member.goalProgress = 100;
				}
			}

			await queryRunner.manager.save(Member, member);

			// ========== Phase 2: 측정값이 있고 Membership이 연결된 경우 추세 업데이트 ==========
			if (createDto.membershipId && this.hasMeasurement(createDto)) {
				await this.updateMembershipTrend(queryRunner, createDto.membershipId, createDto);
			}

			await queryRunner.commitTransaction();
			return savedSession;
		} catch (error) {
			await queryRunner.rollbackTransaction();
			this.logger.error(`PT 세션 생성 실패: ${error.message}`);
			throw error;
		} finally {
			await queryRunner.release();
		}
	}

	/**
	 * 측정값이 있는지 확인
	 */
	private hasMeasurement(dto: CreatePTSessionDto): boolean {
		return !!(
			dto.measuredWeight ||
			dto.measuredMuscleMass ||
			dto.measuredBodyFat ||
			dto.benchPress1RM ||
			dto.squat1RM ||
			dto.deadlift1RM ||
			dto.stepTestTime
		);
	}

	/**
	 * Phase 2: Membership 추세 업데이트
	 */
	private async updateMembershipTrend(
		queryRunner: any,
		membershipId: string,
		dto: CreatePTSessionDto,
	): Promise<void> {
		const membership = await queryRunner.manager.findOne(Membership, {
			where: { id: membershipId },
		});

		if (!membership || !membership.mainGoalType) {
			return;
		}

		// 해당 목표 유형에 맞는 측정값 추출
		const currentValue = ProgressCalculator.extractMeasurementValue(
			membership.mainGoalType,
			{
				weight: dto.measuredWeight,
				muscleMass: dto.measuredMuscleMass,
				bodyFat: dto.measuredBodyFat,
				benchPress1RM: dto.benchPress1RM,
				squat1RM: dto.squat1RM,
				deadlift1RM: dto.deadlift1RM,
				stepTestTime: dto.stepTestTime,
			},
		);

		if (currentValue === null) {
			return;
		}

		// 최근 측정값 히스토리 조회 (해당 Membership의 PT 세션들)
		const recentSessions = await queryRunner.manager.find(PTSession, {
			where: { membershipId },
			order: { sessionDate: 'ASC' },
		});

		// 측정값 배열 생성
		const measurements: number[] = [];
		for (const session of recentSessions) {
			const value = ProgressCalculator.extractMeasurementValue(
				membership.mainGoalType,
				{
					weight: session.measuredWeight,
					muscleMass: session.measuredMuscleMass,
					bodyFat: session.measuredBodyFat,
					benchPress1RM: session.benchPress1RM,
					squat1RM: session.squat1RM,
					deadlift1RM: session.deadlift1RM,
					stepTestTime: session.stepTestTime,
				},
			);
			if (value !== null) {
				measurements.push(value);
			}
		}

		// 현재 값 추가 (방금 생성된 세션)
		measurements.push(currentValue);

		// 추세 분석
		const { status, flags } = ProgressCalculator.calculateRiskStatusByTrend(
			measurements,
			membership.mainGoalType,
			membership.goalDirection,
		);

		// 진행률 계산 (목표가 설정된 경우)
		let progress = membership.currentProgress;
		if (membership.startValue != null && membership.targetValue != null) {
			progress = ProgressCalculator.calculateProgress(
				membership.mainGoalType,
				membership.startValue,
				currentValue,
				membership.targetValue,
				membership.goalDirection,
			);
		}

		// Membership 업데이트
		await queryRunner.manager.update(Membership, membershipId, {
			currentValue,
			currentProgress: progress,
			riskStatus: status,
			isRapidProgress: flags.includes('rapid_progress'),
			lastMeasurementAt: new Date(),
			isMeasurementOverdue: false,
		});

		this.logger.log(
			`Membership ${membershipId} 업데이트: status=${status}, progress=${progress}%, flags=${flags.join(',')}`,
		);
	}

	async update(
		id: string,
		memberId: string,
		updateDto: UpdatePTSessionDto,
	): Promise<PTSession> {
		const session = await this.findOne(id, memberId);
		EntityUpdateHelper.updateFieldsWithDateConversion(session, updateDto, ['sessionDate']);
		return this.ptSessionRepository.save(session);
	}

	async remove(id: string, memberId: string): Promise<void> {
		await RepositoryHelper.ensureMemberExists(this.memberRepository, memberId, this.logger);
		const member = await this.memberRepository.findOne({ where: { id: memberId } });

		const session = await this.findOne(id, memberId);
		await this.ptSessionRepository.remove(session);

		// completedSessions 자동 감소
		if (member.completedSessions > 0) {
			member.completedSessions -= 1;

			// 목표 진행률 자동 업데이트
			if (member.totalSessions > 0) {
				member.goalProgress = Math.round(
					(member.completedSessions / member.totalSessions) * 100,
				);
			} else {
				member.goalProgress = 0;
			}

			await this.memberRepository.save(member);
		}
	}
}

