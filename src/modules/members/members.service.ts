import {
	Injectable,
	Logger,
} from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Member } from '../../entities/member.entity';
import { Membership } from '../../entities/membership.entity';
import { MembershipStatus, MemberStatus, GoalTypeNames, GoalTypeUnits, RiskStatus } from '../../common/enums';
import { PTUsage } from '../../entities/pt-usage.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdatePTUsageDto } from './dto/update-pt-usage.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { CreateGoalDto } from './dto/create-goal.dto';
import { CreateMemberFullDto } from './dto/create-member-full.dto';
import { WorkoutVolumeQueryDto, VolumePeriod } from './dto/workout-volume-query.dto';
import { ApiExceptions } from '../../common/exceptions';
import { EntityUpdateHelper } from '../../common/utils/entity-update-helper';
import { RepositoryHelper } from '../../common/utils/repository-helper';
import { MemberHelper } from '../../common/utils/member-helper';

@Injectable()
export class MembersService {
	private readonly logger = new Logger(MembersService.name);

	constructor(
		@InjectRepository(Member)
		private memberRepository: Repository<Member>,
		@InjectRepository(Membership)
		private membershipRepository: Repository<Membership>,
		@InjectRepository(PTUsage)
		private ptUsageRepository: Repository<PTUsage>,
		private dataSource: DataSource,
	) {}

  async findAll(page: number = 1, pageSize: number = 10): Promise<{ members: Member[]; total: number; page: number; pageSize: number }> {
    const skip = (page - 1) * pageSize;
    const [members, total] = await this.memberRepository.findAndCount({
      relations: ['memberships', 'ptUsages'],
      order: { createdAt: 'DESC' },
      skip,
      take: pageSize,
    });
    return { members, total, page, pageSize };
  }

  async findOne(id: string): Promise<Member> {
    const member = await RepositoryHelper.findOneOrFail(
      this.memberRepository,
      {
        where: { id },
        relations: ['memberships', 'ptUsages', 'assessments', 'injuries'],
      },
      this.logger,
      '회원',
    );

    // DB에 저장된 age를 그대로 사용 (create/update 시 이미 계산되어 저장됨)
    // 기존 데이터 대비: birthDate가 있는데 age가 null인 경우에만 재계산
    if (member.birthDate && (!member.age || member.age === null)) {
      member.age = MemberHelper.calculateAge(member.birthDate);
      // DB에도 저장 (다음 조회 시 재계산 불필요)
      await this.memberRepository.save(member);
    }

    return member;
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    const existingMember = await this.memberRepository.findOne({
      where: { email: createMemberDto.email },
    });

		if (existingMember) {
			this.logger.warn(
				`이미 등록된 이메일입니다. Email: ${createMemberDto.email}`,
			);
			throw ApiExceptions.memberAlreadyExists();
		}

    // 생년월일이 있으면 한국나이 자동 계산하여 DB에 저장
    const birthDate = createMemberDto.birthDate ? new Date(createMemberDto.birthDate) : undefined;
    const age = MemberHelper.calculateAge(birthDate);

    const member = this.memberRepository.create({
      ...createMemberDto,
      joinDate: new Date(createMemberDto.joinDate),
      birthDate,
      age, // DB에 저장
      status: createMemberDto.status || MemberStatus.ACTIVE,
    });

    return this.memberRepository.save(member);
  }

  /**
   * 회원 등록 (3단계 위저드 통합)
   * Step 1: 기본 정보 → Member 생성
   * Step 2: 회원권 + 프로그램 → Membership + PTUsage 생성
   * Step 3: 초기 측정값 → Member 필드 업데이트
   */
  async createFull(dto: CreateMemberFullDto): Promise<{
    member: Member;
    membership?: Membership;
    ptUsage?: PTUsage;
  }> {
    // 이메일 중복 체크
    const existingMember = await this.memberRepository.findOne({
      where: { email: dto.email },
    });

    if (existingMember) {
      this.logger.warn(`이미 등록된 이메일입니다. Email: ${dto.email}`);
      throw ApiExceptions.memberAlreadyExists();
    }

    // 트랜잭션으로 처리
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Step 1: Member 생성
      const birthDate = dto.birthDate ? new Date(dto.birthDate) : undefined;
      const age = MemberHelper.calculateAge(birthDate);

      // 초기 측정값이 있으면 Member에 반영
      const memberWeight = dto.initialMeasurement?.weight ?? dto.weight;

      const member = queryRunner.manager.create(Member, {
        name: dto.name,
        phone: dto.phone,
        email: dto.email,
        joinDate: new Date(dto.joinDate),
        birthDate,
        age,
        gender: dto.gender,
        height: dto.height,
        weight: memberWeight,
        status: dto.status || MemberStatus.ACTIVE,
        totalSessions: dto.membership?.ptTotalCount || 0,
        completedSessions: 0,
        goalProgress: 0,
      });

      const savedMember = await queryRunner.manager.save(Member, member);
      let savedMembership: Membership | undefined;
      let savedPTUsage: PTUsage | undefined;

      // Step 2: Membership + Program 생성 (선택)
      if (dto.membership) {
        const m = dto.membership;

        // 목표 라벨 자동 생성
        const mainGoalLabel = m.mainGoalLabel || 
          (m.mainGoalType ? GoalTypeNames[m.mainGoalType] : undefined);

        // 목표 단위 자동 설정
        const targetUnit = m.targetUnit || 
          (m.mainGoalType ? GoalTypeUnits[m.mainGoalType] : undefined);

        const membership = queryRunner.manager.create(Membership, {
          memberId: savedMember.id,
          membershipType: m.membershipType,
          purchaseDate: new Date(m.purchaseDate),
          expiryDate: new Date(m.expiryDate),
          status: m.status || MembershipStatus.ACTIVE,
          price: m.price,
          // 프로그램 정보
          durationWeeks: m.durationWeeks,
          mainGoalType: m.mainGoalType,
          mainGoalLabel,
          targetValue: m.targetValue,
          targetUnit,
          startValue: m.startValue ?? dto.initialMeasurement?.weight,
          currentValue: dto.initialMeasurement?.weight,
          currentProgress: 0,
          riskStatus: RiskStatus.FOUNDATION,
        });

        savedMembership = await queryRunner.manager.save(Membership, membership);

        // PT 횟수 생성
        if (m.ptTotalCount && m.ptTotalCount > 0) {
          const ptUsage = queryRunner.manager.create(PTUsage, {
            memberId: savedMember.id,
            totalCount: m.ptTotalCount,
            remainingCount: m.ptTotalCount,
            usedCount: 0,
          });

          savedPTUsage = await queryRunner.manager.save(PTUsage, ptUsage);
        }
      }

      // Step 3: 초기 측정값 업데이트 (이미 weight는 반영됨)
      // 추가 측정값은 나중에 Assessment나 PTSession에서 기록

      await queryRunner.commitTransaction();

      this.logger.log(
        `회원 등록 완료: ${savedMember.name} (ID: ${savedMember.id})` +
        (savedMembership ? `, 회원권: ${savedMembership.id}` : '') +
        (savedPTUsage ? `, PT: ${savedPTUsage.totalCount}회` : '')
      );

      return {
        member: savedMember,
        membership: savedMembership,
        ptUsage: savedPTUsage,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`회원 등록 실패: ${error.message}`);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    const member = await this.memberRepository.findOne({
      where: { id },
      relations: ['memberships', 'ptUsages', 'assessments', 'injuries'],
    });

    if (!member) {
      this.logger.warn(`회원을 찾을 수 없습니다. ID: ${id}`);
      throw ApiExceptions.memberNotFound();
    }

    // EntityUpdateHelper를 사용하여 날짜 필드 변환 및 업데이트
    EntityUpdateHelper.updateFieldsWithDateConversion(member, updateMemberDto, ['birthDate', 'joinDate']);

    // birthDate가 업데이트된 경우 나이 재계산하여 DB에 저장
    if (updateMemberDto.birthDate !== undefined) {
      // birthDate 필드가 업데이트되었으므로 나이 재계산
      member.age = MemberHelper.recalculateAge(
        member.birthDate,
        updateMemberDto.birthDate,
      );
      
      // 명시적으로 null로 설정된 경우 birthDate도 null로 설정
      if (updateMemberDto.birthDate === null) {
        member.birthDate = undefined;
      }
    }

    return this.memberRepository.save(member);
  }

  async remove(id: string): Promise<void> {
    const member = await this.findOne(id);
    await this.memberRepository.softDelete(id);
  }

  // 회원권 관리
  async getMembership(memberId: string): Promise<Membership | null> {
    return this.membershipRepository.findOne({
      where: { memberId, status: MembershipStatus.ACTIVE },
      order: { createdAt: 'DESC' },
    });
  }

  async createMembership(
    memberId: string,
    createMembershipDto: CreateMembershipDto,
  ): Promise<Membership> {
    await this.findOne(memberId); // 회원 존재 확인

    // 날짜 필드 변환
    const membershipData = EntityUpdateHelper.convertDateFields(
      { ...createMembershipDto, memberId },
      ['purchaseDate', 'expiryDate'],
    );

    const membership = this.membershipRepository.create(membershipData);
    return this.membershipRepository.save(membership);
  }

  async updateMembership(
    memberId: string,
    membershipId: string,
    updateData: Partial<CreateMembershipDto>,
  ): Promise<Membership> {
    const membership = await this.membershipRepository.findOne({
      where: { id: membershipId, memberId },
    });

		if (!membership) {
			this.logger.warn(
				`회원권을 찾을 수 없습니다. MemberId: ${memberId}, MembershipId: ${membershipId}`,
			);
			throw ApiExceptions.membershipNotFound();
		}

    // EntityUpdateHelper를 사용하여 날짜 필드 변환 및 업데이트
    EntityUpdateHelper.updateFieldsWithDateConversion(membership, updateData, ['purchaseDate', 'expiryDate']);

    return this.membershipRepository.save(membership);
  }

  // PT 횟수 관리
  async getPTUsage(memberId: string): Promise<PTUsage | null> {
    return this.ptUsageRepository.findOne({
      where: { memberId },
      order: { createdAt: 'DESC' },
    });
  }

  async createOrUpdatePTUsage(
    memberId: string,
    updatePTUsageDto: UpdatePTUsageDto,
  ): Promise<PTUsage> {
    await this.findOne(memberId); // 회원 존재 확인

    let ptUsage = await this.getPTUsage(memberId);

    if (!ptUsage) {
      ptUsage = this.ptUsageRepository.create({
        memberId,
        totalCount: updatePTUsageDto.totalCount || 0,
        remainingCount: updatePTUsageDto.remainingCount || 0,
        usedCount: updatePTUsageDto.usedCount || 0,
      });
    } else {
      EntityUpdateHelper.updateFields(ptUsage, updatePTUsageDto);
      if (updatePTUsageDto.usedCount !== undefined) {
        ptUsage.lastUsedDate = new Date();
      }
    }

		return this.ptUsageRepository.save(ptUsage);
	}

	async deleteMembership(memberId: string, membershipId: string): Promise<void> {
		const membership = await this.membershipRepository.findOne({
			where: { id: membershipId, memberId },
		});

		if (!membership) {
			this.logger.warn(
				`회원권을 찾을 수 없습니다. MemberId: ${memberId}, MembershipId: ${membershipId}`,
			);
			throw ApiExceptions.membershipNotFound();
		}

		await this.membershipRepository.remove(membership);
	}

	// 1차피드백: 목표 관리
	async getGoal(memberId: string): Promise<{
		id: string;
		memberId: string;
		goal?: string;
		goalProgress: number;
		goalTrainerComment?: string;
		totalSessions: number;
		completedSessions: number;
		createdAt: Date;
		updatedAt: Date;
	}> {
		const member = await this.findOne(memberId);

		// 목표가 없으면 404 에러
		if (!member.goal && member.goalProgress === 0 && !member.goalTrainerComment) {
			throw ApiExceptions.goalNotFound();
		}

		return {
			id: member.id,
			memberId: member.id,
			goal: member.goal,
			goalProgress: member.goalProgress,
			goalTrainerComment: member.goalTrainerComment,
			totalSessions: member.totalSessions,
			completedSessions: member.completedSessions,
			createdAt: member.createdAt,
			updatedAt: member.updatedAt,
		};
	}

	async createGoal(memberId: string, createGoalDto: CreateGoalDto): Promise<Member> {
		const member = await this.findOne(memberId);

		// 이미 목표가 있는지 확인 (goal 필드가 있거나 goalProgress가 0이 아닌 경우)
		if (member.goal || member.goalProgress > 0 || member.goalTrainerComment) {
			throw ApiExceptions.validationError('이미 목표가 존재합니다. 수정 API를 사용해주세요.');
		}

		// goalProgress 범위 검증
		if (createGoalDto.goalProgress !== undefined) {
			if (createGoalDto.goalProgress < 0 || createGoalDto.goalProgress > 100) {
				throw ApiExceptions.validationError('목표 진행률은 0-100 사이의 값이어야 합니다.');
			}
		}

		EntityUpdateHelper.updateFields(member, {
			goal: createGoalDto.goal,
			goalProgress: createGoalDto.goalProgress ?? 0,
			goalTrainerComment: createGoalDto.goalTrainerComment,
		});

		return this.memberRepository.save(member);
	}

	async updateGoal(memberId: string, updateGoalDto: UpdateGoalDto): Promise<Member> {
		const member = await this.findOne(memberId);

		// goalProgress 범위 검증
		if (updateGoalDto.goalProgress !== undefined) {
			if (updateGoalDto.goalProgress < 0 || updateGoalDto.goalProgress > 100) {
				throw ApiExceptions.validationError('목표 진행률은 0-100 사이의 값이어야 합니다.');
			}
		}

		// completedSessions가 totalSessions를 초과하지 않도록 검증
		if (
			updateGoalDto.completedSessions !== undefined &&
			updateGoalDto.totalSessions !== undefined
		) {
			if (updateGoalDto.completedSessions > updateGoalDto.totalSessions) {
				throw ApiExceptions.validationError(
					'완료된 수업 회차는 총 수업 회차를 초과할 수 없습니다.',
				);
			}
		} else if (updateGoalDto.completedSessions !== undefined) {
			if (updateGoalDto.completedSessions > member.totalSessions) {
				throw ApiExceptions.validationError(
					'완료된 수업 회차는 총 수업 회차를 초과할 수 없습니다.',
				);
			}
		}

		EntityUpdateHelper.updateFields(member, updateGoalDto);

		return this.memberRepository.save(member);
	}

	async deleteGoal(memberId: string): Promise<void> {
		const member = await this.findOne(memberId);

		// 목표가 없으면 404 에러
		if (!member.goal && member.goalProgress === 0 && !member.goalTrainerComment) {
			throw ApiExceptions.goalNotFound();
		}

		// 목표 필드 초기화
		member.goal = null;
		member.goalProgress = 0;
		member.goalTrainerComment = null;

		await this.memberRepository.save(member);
	}

	// 1차피드백: 대시보드 통합
	async getDashboard(memberId: string): Promise<{
		goal: {
			goal?: string;
			goalProgress: number;
			goalTrainerComment?: string;
		};
		sessionProgress: {
			totalSessions: number;
			completedSessions: number;
			progressPercentage: number;
		};
		workoutCalendar: Array<{
			date: string;
			ptSessions: Array<{
				id: string;
				sessionNumber: number;
				mainContent: string;
			}>;
			personalWorkouts: Array<{
				id: string;
				exerciseName: string;
				bodyPart: string;
			}>;
		}>;
		workoutAnalysis: {
			period: 'week' | 'month';
			bodyPartVolumes: Array<{
				bodyPart: string;
				volume: number;
			}>;
			totalVolume: number;
		};
	}> {
		const member = await this.findOne(memberId);

		// 목표 정보
		const goal = {
			goal: member.goal,
			goalProgress: member.goalProgress,
			goalTrainerComment: member.goalTrainerComment,
		};

		// 수업 진행률
		const progressPercentage =
			member.totalSessions > 0
				? Math.round((member.completedSessions / member.totalSessions) * 100)
				: 0;

		const sessionProgress = {
			totalSessions: member.totalSessions,
			completedSessions: member.completedSessions,
			progressPercentage,
		};

		// 운동 캘린더 (최근 30일)
		const now = new Date();
		const thirtyDaysAgo = new Date(now);
		thirtyDaysAgo.setDate(now.getDate() - 30);

		// PT 세션과 운동 기록을 함께 조회
		const ptSessions = await this.memberRepository.manager.query(`
			SELECT 
				id,
				session_number as "sessionNumber",
				session_date as "sessionDate",
				main_content as "mainContent"
			FROM pt_sessions
			WHERE member_id = $1
				AND session_date >= $2
				AND session_date <= $3
			ORDER BY session_date DESC
		`, [memberId, thirtyDaysAgo.toISOString().split('T')[0], now.toISOString().split('T')[0]]);

		const workoutRecords = await this.memberRepository.manager.query(`
			SELECT 
				id,
				workout_date as "workoutDate",
				exercise_name as "exerciseName",
				body_part as "bodyPart",
				workout_type as "workoutType"
			FROM workout_records
			WHERE member_id = $1
				AND workout_date >= $2
				AND workout_date <= $3
			ORDER BY workout_date DESC
		`, [memberId, thirtyDaysAgo.toISOString().split('T')[0], now.toISOString().split('T')[0]]);

		// 날짜별로 그룹화
		const calendarMap = new Map<string, {
			date: string;
			ptSessions: any[];
			personalWorkouts: any[];
		}>();

		ptSessions.forEach((session: any) => {
			const date = session.sessionDate;
			if (!calendarMap.has(date)) {
				calendarMap.set(date, {
					date,
					ptSessions: [],
					personalWorkouts: [],
				});
			}
			calendarMap.get(date)!.ptSessions.push({
				id: session.id,
				sessionNumber: session.sessionNumber,
				mainContent: session.mainContent,
			});
		});

		workoutRecords.forEach((record: any) => {
			const date = record.workoutDate;
			if (!calendarMap.has(date)) {
				calendarMap.set(date, {
					date,
					ptSessions: [],
					personalWorkouts: [],
				});
			}
			if (record.workoutType === 'PERSONAL') {
				calendarMap.get(date)!.personalWorkouts.push({
					id: record.id,
					exerciseName: record.exerciseName,
					bodyPart: record.bodyPart,
				});
			}
		});

		const workoutCalendar = Array.from(calendarMap.values())
			.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		// 운동 기록 분석 (주간)
		const workoutAnalysis = await this.getWorkoutVolumeAnalysis(memberId, VolumePeriod.WEEK);

		return {
			goal,
			sessionProgress,
			workoutCalendar,
			workoutAnalysis,
		};
	}

	private async getWorkoutVolumeAnalysis(
		memberId: string,
		period: VolumePeriod,
	): Promise<{
		period: 'week' | 'month';
		bodyPartVolumes: Array<{ bodyPart: string; volume: number }>;
		totalVolume: number;
	}> {
		const now = new Date();
		let startDate: Date;

		if (period === VolumePeriod.WEEK) {
			const dayOfWeek = now.getDay();
			const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
			startDate = new Date(now);
			startDate.setDate(now.getDate() - diff);
			startDate.setHours(0, 0, 0, 0);
		} else {
			startDate = new Date(now.getFullYear(), now.getMonth(), 1);
		}

		const endDate = new Date(now);
		endDate.setHours(23, 59, 59, 999);

		const records = await this.memberRepository.manager.query(`
			SELECT 
				body_part as "bodyPart",
				SUM(volume) as volume
			FROM workout_records
			WHERE member_id = $1
				AND workout_date >= $2
				AND workout_date <= $3
			GROUP BY body_part
			ORDER BY volume DESC
		`, [memberId, startDate.toISOString().split('T')[0], endDate.toISOString().split('T')[0]]);

		const bodyPartVolumes = records.map((r: any) => ({
			bodyPart: r.bodyPart,
			volume: Math.round(parseFloat(r.volume) * 100) / 100,
		}));

		const totalVolume = bodyPartVolumes.reduce((sum, item) => sum + item.volume, 0);

		return {
			period,
			bodyPartVolumes,
			totalVolume: Math.round(totalVolume * 100) / 100,
		};
	}

	/**
	 * Goal Analyst API (Phase 4)
	 * 회원의 목표 진행 상황, 추세, 다음 목표 등을 분석
	 */
	async getGoalAnalyst(memberId: string): Promise<{
		program: {
			mainGoal: string | null;
			mainGoalType: string | null;
			durationWeeks: number | null;
			startValue: number | null;
			currentValue: number | null;
			targetValue: number | null;
			targetUnit: string | null;
			currentProgress: number;
			riskStatus: string;
			startDate: string | null;
			endDate: string | null;
			// Phase 2: 추세 기반 플래그
			isRapidProgress: boolean;
			isMeasurementOverdue: boolean;
			lastMeasurementAt: string | null;
		};
		progressRoadmap: {
			start: { value: number; date: string } | null;
			current: { value: number; date: string } | null;
			goal: { value: number; date: string } | null;
		};
		trend: {
			direction: 'UP' | 'DOWN' | 'STABLE';
			recentValues: Array<{ date: string; value: number }>;
			averageChange: number;
		};
		nextTarget: {
			value: number | null;
			description: string | null;
		};
		sessionProgress: {
			totalSessions: number;
			completedSessions: number;
			progressPercentage: number;
		};
	}> {
		const member = await this.findOne(memberId);

		// 활성 회원권 + 프로그램 정보 조회
		const membership = await this.membershipRepository.findOne({
			where: { memberId, status: 'ACTIVE' as any },
			order: { createdAt: 'DESC' },
		});

		// 프로그램 정보
		const program = {
			mainGoal: membership?.mainGoalLabel || null,
			mainGoalType: membership?.mainGoalType || null,
			durationWeeks: membership?.durationWeeks || null,
			startValue: membership?.startValue || null,
			currentValue: membership?.currentValue || null,
			targetValue: membership?.targetValue || null,
			targetUnit: membership?.targetUnit || null,
			currentProgress: membership?.currentProgress || 0,
			riskStatus: membership?.riskStatus || 'FOUNDATION', // Phase 2: 기본값 FOUNDATION
			startDate: membership?.purchaseDate ? new Date(membership.purchaseDate).toISOString().split('T')[0] : null,
			endDate: membership?.expiryDate ? new Date(membership.expiryDate).toISOString().split('T')[0] : null,
			// Phase 2: 추세 기반 플래그
			isRapidProgress: membership?.isRapidProgress || false,
			isMeasurementOverdue: membership?.isMeasurementOverdue || false,
			lastMeasurementAt: membership?.lastMeasurementAt ? new Date(membership.lastMeasurementAt).toISOString() : null,
		};

		// Progress Roadmap
		const progressRoadmap = {
			start: membership?.startValue && membership?.purchaseDate ? {
				value: membership.startValue,
				date: new Date(membership.purchaseDate).toISOString().split('T')[0],
			} : null,
			current: membership?.currentValue ? {
				value: membership.currentValue,
				date: new Date().toISOString().split('T')[0],
			} : null,
			goal: membership?.targetValue && membership?.expiryDate ? {
				value: membership.targetValue,
				date: new Date(membership.expiryDate).toISOString().split('T')[0],
			} : null,
		};

		// 추세 분석 (최근 PT 세션의 측정값)
		const recentMeasurements = await this.memberRepository.manager.query(`
			SELECT 
				session_date as "date",
				measured_weight as "value"
			FROM pt_sessions
			WHERE member_id = $1
				AND measured_weight IS NOT NULL
			ORDER BY session_date DESC
			LIMIT 10
		`, [memberId]);

		let trend: { direction: 'UP' | 'DOWN' | 'STABLE'; recentValues: Array<{ date: string; value: number }>; averageChange: number };

		if (recentMeasurements.length >= 2) {
			const values = recentMeasurements.map((m: any) => ({
				date: m.date,
				value: parseFloat(m.value),
			})).reverse();

			// 평균 변화량 계산
			let totalChange = 0;
			for (let i = 1; i < values.length; i++) {
				totalChange += values[i].value - values[i - 1].value;
			}
			const averageChange = totalChange / (values.length - 1);

			// 방향 결정
			let direction: 'UP' | 'DOWN' | 'STABLE';
			if (averageChange > 0.5) direction = 'UP';
			else if (averageChange < -0.5) direction = 'DOWN';
			else direction = 'STABLE';

			trend = { direction, recentValues: values, averageChange: Math.round(averageChange * 100) / 100 };
		} else {
			trend = { direction: 'STABLE', recentValues: [], averageChange: 0 };
		}

		// 다음 목표 계산
		let nextTarget: { value: number | null; description: string | null } = { value: null, description: null };

		if (membership?.currentValue && membership?.targetValue && membership?.targetUnit) {
			const isReductionGoal = membership.mainGoalType === 'WEIGHT_LOSS';
			const remaining = isReductionGoal
				? membership.currentValue - membership.targetValue
				: membership.targetValue - membership.currentValue;

			if (remaining > 0) {
				// 주간 목표 계산 (남은 기간 기준)
				const weeksRemaining = membership.durationWeeks
					? Math.max(1, Math.ceil((new Date(membership.expiryDate).getTime() - Date.now()) / (7 * 24 * 60 * 60 * 1000)))
					: 4;
				const weeklyTarget = remaining / weeksRemaining;

				nextTarget = {
					value: Math.round((membership.currentValue + (isReductionGoal ? -weeklyTarget : weeklyTarget)) * 10) / 10,
					description: `다음 주 목표: ${Math.round(weeklyTarget * 10) / 10}${membership.targetUnit} ${isReductionGoal ? '감량' : '증가'}`,
				};
			}
		}

		// 수업 진행률
		const sessionProgress = {
			totalSessions: member.totalSessions,
			completedSessions: member.completedSessions,
			progressPercentage: member.totalSessions > 0
				? Math.round((member.completedSessions / member.totalSessions) * 100)
				: 0,
		};

		return {
			program,
			progressRoadmap,
			trend,
			nextTarget,
			sessionProgress,
		};
	}
}

