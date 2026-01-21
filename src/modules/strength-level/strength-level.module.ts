import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StrengthLevelController } from './strength-level.controller';
import { StrengthLevelService } from './strength-level.service';
import { Exercise } from '../../entities/exercise.entity';
import { StrengthStandard } from '../../entities/strength-standard.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Exercise, StrengthStandard])],
	controllers: [StrengthLevelController],
	providers: [StrengthLevelService],
	exports: [StrengthLevelService],
})
export class StrengthLevelModule {}
