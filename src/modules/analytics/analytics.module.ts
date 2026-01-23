import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController, MemberAnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AbilitySnapshot } from '../../entities/ability-snapshot.entity';
import { Member } from '../../entities/member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AbilitySnapshot, Member])],
  controllers: [AnalyticsController, MemberAnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}

