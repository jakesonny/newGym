import { IsEnum, IsNumber, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Gender } from '../../../common/enums';

/**
 * 빅3 운동 타입
 */
export enum ExerciseType {
	BENCH_PRESS = 'BENCH_PRESS',
	SQUAT = 'SQUAT',
	DEADLIFT = 'DEADLIFT',
}

/**
 * 운동 타입별 한글명 매핑
 */
export const ExerciseTypeNames: Record<ExerciseType, string> = {
	[ExerciseType.BENCH_PRESS]: '벤치프레스',
	[ExerciseType.SQUAT]: '스쿼트',
	[ExerciseType.DEADLIFT]: '데드리프트',
};

/**
 * 운동 타입별 영문명 매핑 (DB 조회용)
 */
export const ExerciseTypeEnglishNames: Record<ExerciseType, string> = {
	[ExerciseType.BENCH_PRESS]: 'Bench Press',
	[ExerciseType.SQUAT]: 'Squat',
	[ExerciseType.DEADLIFT]: 'Deadlift',
};

/**
 * Strength Level 측정 요청 DTO
 */
export class CalculateStrengthLevelDto {
	@ApiProperty({
		enum: ExerciseType,
		description: '운동 종류 (BENCH_PRESS, SQUAT, DEADLIFT)',
		example: ExerciseType.BENCH_PRESS,
	})
	@IsEnum(ExerciseType)
	exerciseType: ExerciseType;

	@ApiProperty({
		description: '나이 (만 나이, 15-90세)',
		example: 25,
		minimum: 15,
		maximum: 90,
	})
	@IsNumber()
	@Min(15)
	@Max(90)
	age: number;

	@ApiProperty({
		description: '체중 (kg)',
		example: 70,
		minimum: 40,
		maximum: 200,
	})
	@IsNumber()
	@Min(40)
	@Max(200)
	bodyWeight: number;

	@ApiProperty({
		enum: Gender,
		description: '성별 (MALE, FEMALE)',
		example: Gender.MALE,
	})
	@IsEnum(Gender)
	gender: Gender;

	@ApiPropertyOptional({
		description: '현재 1RM 무게 (kg) - 입력시 현재 레벨 판정',
		example: 80,
		minimum: 0,
		maximum: 500,
	})
	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(500)
	currentWeight?: number;
}
