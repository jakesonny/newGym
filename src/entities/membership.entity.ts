import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Member } from './member.entity';
import { ProgramMilestone } from './program-milestone.entity';
import { MembershipType, MembershipStatus, GoalType, RiskStatus, GoalDirection } from '../common/enums';

@Index('idx_memberships_member_id', ['memberId'])
@Index('idx_memberships_status', ['status'])
@Index('idx_memberships_expiry_date', ['expiryDate'])
@Index('idx_memberships_risk_status', ['riskStatus'])
@Entity('memberships')
export class Membership {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'member_id' })
  memberId: string;

  @ManyToOne(() => Member, (member) => member.memberships, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'member_id' })
  member: Member;

  @Column({
    type: 'enum',
    enum: MembershipType,
    name: 'membership_type',
  })
  membershipType: MembershipType;

  @Column({ type: 'date', name: 'purchase_date' })
  purchaseDate: Date;

  @Column({ type: 'date', name: 'expiry_date' })
  expiryDate: Date;

  @Column({
    type: 'enum',
    enum: MembershipStatus,
    default: MembershipStatus.ACTIVE,
  })
  status: MembershipStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  // ========== 프로그램 관련 필드 (Phase 2 추가) ==========

  @Column({ type: 'int', name: 'duration_weeks', nullable: true, comment: '프로그램 기간 (4, 8, 12주)' })
  durationWeeks?: number;

  @Column({
    type: 'enum',
    enum: GoalType,
    name: 'main_goal_type',
    nullable: true,
    comment: '메인 목표 유형',
  })
  mainGoalType?: GoalType;

  @Column({ name: 'main_goal_label', nullable: true, comment: '메인 목표 라벨 (예: 체중 감량)' })
  mainGoalLabel?: string;

  @Column({ type: 'float', name: 'target_value', nullable: true, comment: '목표 수치' })
  targetValue?: number;

  @Column({ name: 'target_unit', nullable: true, comment: '목표 단위 (kg, %)' })
  targetUnit?: string;

  @Column({ type: 'float', name: 'start_value', nullable: true, comment: '시작 수치' })
  startValue?: number;

  @Column({ type: 'float', name: 'current_value', nullable: true, comment: '현재 수치' })
  currentValue?: number;

  @Column({ type: 'int', name: 'current_progress', default: 0, comment: '현재 진행률 (0-100)' })
  currentProgress: number;

  @Column({
    type: 'enum',
    enum: RiskStatus,
    name: 'risk_status',
    default: RiskStatus.FOUNDATION,
    comment: '위험 상태 (FOUNDATION/GREEN/YELLOW/RED)',
  })
  riskStatus: RiskStatus;

  // ========== Phase 2 추세 기반 판정 필드 ==========

  @Column({
    type: 'enum',
    enum: GoalDirection,
    name: 'goal_direction',
    nullable: true,
    comment: 'CUSTOM 목표용 방향 (INCREASE/DECREASE)',
  })
  goalDirection?: GoalDirection;

  @Column({ type: 'boolean', name: 'is_rapid_progress', default: false, comment: '급변 플래그 (빠른 순방향 변화)' })
  isRapidProgress: boolean;

  @Column({ type: 'boolean', name: 'is_measurement_overdue', default: false, comment: '측정 미실시 플래그 (2주 경과)' })
  isMeasurementOverdue: boolean;

  @Column({ type: 'timestamp', name: 'last_measurement_at', nullable: true, comment: '마지막 측정 일시' })
  lastMeasurementAt?: Date;

  @OneToMany(() => ProgramMilestone, (milestone) => milestone.membership)
  milestones: ProgramMilestone[];

  // ========== 기존 필드 ==========

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

