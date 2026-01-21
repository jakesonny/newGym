import { IsEnum, IsNumber, IsOptional, IsString, Min, Max, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GoalType } from '../../../common/enums';

/**
 * 프로그램 생성 DTO (회원권 생성 시 함께 사용)
 */
export class CreateProgramDto {
	@ApiProperty({
		description: '프로그램 기간 (주)',
		example: 12,
		enum: [4, 8, 12],
	})
	@IsNumber()
	durationWeeks: number;

	@ApiProperty({
		enum: GoalType,
		description: '메인 목표 유형',
		example: GoalType.WEIGHT_LOSS,
	})
	@IsEnum(GoalType)
	mainGoalType: GoalType;

	@ApiPropertyOptional({
		description: '메인 목표 라벨 (미입력시 GoalType에서 자동 생성)',
		example: '체중 감량',
	})
	@IsOptional()
	@IsString()
	mainGoalLabel?: string;

	@ApiPropertyOptional({
		description: '목표 수치',
		example: 10,
	})
	@IsOptional()
	@IsNumber()
	targetValue?: number;

	@ApiPropertyOptional({
		description: '목표 단위',
		example: 'kg',
	})
	@IsOptional()
	@IsString()
	targetUnit?: string;

	@ApiPropertyOptional({
		description: '시작 수치 (현재 체중 등)',
		example: 85,
	})
	@IsOptional()
	@IsNumber()
	startValue?: number;
}

/**
 * 프로그램 업데이트 DTO
 */
export class UpdateProgramDto {
	@ApiPropertyOptional({
		enum: GoalType,
		description: '메인 목표 유형',
	})
	@IsOptional()
	@IsEnum(GoalType)
	mainGoalType?: GoalType;

	@ApiPropertyOptional({
		description: '메인 목표 라벨',
	})
	@IsOptional()
	@IsString()
	mainGoalLabel?: string;

	@ApiPropertyOptional({
		description: '목표 수치',
	})
	@IsOptional()
	@IsNumber()
	targetValue?: number;

	@ApiPropertyOptional({
		description: '목표 단위',
	})
	@IsOptional()
	@IsString()
	targetUnit?: string;

	@ApiPropertyOptional({
		description: '시작 수치',
	})
	@IsOptional()
	@IsNumber()
	startValue?: number;

	@ApiPropertyOptional({
		description: '현재 수치 (수동 업데이트)',
	})
	@IsOptional()
	@IsNumber()
	currentValue?: number;
}

/**
 * 프로그램 진행률 업데이트 DTO (측정값 기반)
 */
export class UpdateProgramProgressDto {
	@ApiProperty({
		description: '현재 측정값',
		example: 79.5,
	})
	@IsNumber()
	currentValue: number;
}
