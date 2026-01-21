import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
	Index,
} from 'typeorm';
import { Member } from './member.entity';
import { Membership } from './membership.entity';

@Index('idx_pt_sessions_member_id', ['memberId'])
@Index('idx_pt_sessions_session_date', ['sessionDate'])
@Index('idx_pt_sessions_session_number', ['memberId', 'sessionNumber'])
@Index('idx_pt_sessions_membership_id', ['membershipId'])
@Entity('pt_sessions')
export class PTSession {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'member_id' })
	memberId: string;

	@ManyToOne(() => Member, (member) => member.ptSessions, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'member_id' })
	member: Member;

	@Column({ name: 'membership_id', nullable: true, comment: '연결된 회원권/프로그램 ID' })
	membershipId?: string;

	@ManyToOne(() => Membership, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'membership_id' })
	membership?: Membership;

	@Column({ type: 'int', name: 'session_number' })
	sessionNumber: number; // 수업 회차: 1, 2, 3... (자동 계산)

	@Column({ type: 'date', name: 'session_date' })
	sessionDate: Date;

	@Column({ type: 'text', name: 'main_content' })
	mainContent: string; // 주요 수업 내용

	@Column({ type: 'text', name: 'trainer_comment', nullable: true })
	trainerComment?: string; // 트레이너 코멘트

	// ========== 측정값 필드 (Phase 2 추가) ==========

	@Column({ type: 'float', name: 'measured_weight', nullable: true, comment: '측정 체중 (kg)' })
	measuredWeight?: number;

	@Column({ type: 'float', name: 'measured_muscle_mass', nullable: true, comment: '측정 골격근량 (kg)' })
	measuredMuscleMass?: number;

	@Column({ type: 'float', name: 'measured_body_fat', nullable: true, comment: '측정 체지방률 (%)' })
	measuredBodyFat?: number;

	@Column({ type: 'float', name: 'bench_press_1rm', nullable: true, comment: '벤치프레스 1RM (kg)' })
	benchPress1RM?: number;

	@Column({ type: 'float', name: 'squat_1rm', nullable: true, comment: '스쿼트 1RM (kg)' })
	squat1RM?: number;

	@Column({ type: 'float', name: 'deadlift_1rm', nullable: true, comment: '데드리프트 1RM (kg)' })
	deadlift1RM?: number;

	@Column({ type: 'boolean', name: 'milestone_created', default: false, comment: '마일스톤 생성 여부' })
	milestoneCreated: boolean;

	// ========== Phase 2 ENDURANCE 측정값 ==========

	@Column({ type: 'int', name: 'step_test_time', nullable: true, comment: '스텝테스트 시간 (초)' })
	stepTestTime?: number;

	// ========== 기존 필드 ==========

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}

