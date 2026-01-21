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
import { Membership } from './membership.entity';
import { PTSession } from './pt-session.entity';

@Index('idx_program_milestones_membership_id', ['membershipId'])
@Index('idx_program_milestones_week_number', ['weekNumber'])
@Index('idx_program_milestones_is_achieved', ['isAchieved'])
@Entity('program_milestones')
export class ProgramMilestone {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'membership_id' })
	membershipId: string;

	@ManyToOne(() => Membership, (membership) => membership.milestones, {
		onDelete: 'CASCADE',
	})
	@JoinColumn({ name: 'membership_id' })
	membership: Membership;

	@Column({ name: 'pt_session_id', nullable: true, comment: '연결된 PT 세션 ID' })
	ptSessionId?: string;

	@ManyToOne(() => PTSession, { nullable: true, onDelete: 'SET NULL' })
	@JoinColumn({ name: 'pt_session_id' })
	ptSession?: PTSession;

	@Column({ type: 'int', name: 'week_number', comment: '주차 (1, 2, 3...)' })
	weekNumber: number;

	@Column({ type: 'date', name: 'target_date', comment: '목표 달성 예정일' })
	targetDate: Date;

	// 측정값들 (PT 세션 후 기록)
	@Column({ type: 'float', name: 'measured_weight', nullable: true, comment: '측정 체중 (kg)' })
	measuredWeight?: number;

	@Column({ type: 'float', name: 'measured_muscle_mass', nullable: true, comment: '측정 골격근량 (kg)' })
	measuredMuscleMass?: number;

	@Column({ type: 'float', name: 'measured_body_fat', nullable: true, comment: '측정 체지방률 (%)' })
	measuredBodyFat?: number;

	@Column({ type: 'float', name: 'measured_value', nullable: true, comment: '목표 관련 측정값' })
	measuredValue?: number;

	// 진행 상태
	@Column({ type: 'int', name: 'progress_at_milestone', nullable: true, comment: '마일스톤 시점 진행률' })
	progressAtMilestone?: number;

	@Column({ type: 'boolean', name: 'is_achieved', default: false, comment: '달성 여부' })
	isAchieved: boolean;

	@Column({ type: 'timestamp', name: 'achieved_at', nullable: true, comment: '달성 일시' })
	achievedAt?: Date;

	// 트레이너 피드백
	@Column({ type: 'text', name: 'trainer_feedback', nullable: true, comment: '트레이너 피드백' })
	trainerFeedback?: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
}
