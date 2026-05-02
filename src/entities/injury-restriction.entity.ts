import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { InjuryHistory } from './injury-history.entity';
import { Category } from '../common/enums';
import { ENTITY_SCHEMA } from '../common/constants/entity-schema';

@Index('idx_injury_restrictions_injury_id', ['injuryId'])
@Index('idx_injury_restrictions_category', ['restrictedCategory'])
@Entity({ name: 'injury_restrictions', schema: ENTITY_SCHEMA })
export class InjuryRestriction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'injury_id' })
  injuryId: string;

  @ManyToOne(() => InjuryHistory, (injury) => injury.restrictions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'injury_id' })
  injury: InjuryHistory;

  @Column({
    type: 'enum',
    enum: Category,
    name: 'restricted_category',
  })
  restrictedCategory: Category;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

