import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StrengthLevel } from '../../../common/enums';

/**
 * 개별 레벨 정보
 */
export class LevelInfo {
	@ApiProperty({
		enum: StrengthLevel,
		description: '레벨 코드',
		example: 'INTERMEDIATE',
	})
	level: StrengthLevel;

	@ApiProperty({
		description: '레벨 한글명',
		example: '중급자',
	})
	levelKorean: string;

	@ApiProperty({
		description: '해당 레벨 기준 무게 (kg)',
		example: 87.5,
	})
	weight: number;

	@ApiProperty({
		description: '레벨 설명',
		example: '일반적인 피트니스 수준을 가진 사람들보다 강합니다.',
	})
	description: string;

	@ApiProperty({
		description: '현재 레벨 여부',
		example: true,
	})
	isCurrent: boolean;

	@ApiProperty({
		description: '다음 목표 레벨 여부',
		example: false,
	})
	isNext: boolean;
}

/**
 * 운동 정보
 */
export class ExerciseInfo {
	@ApiProperty({
		description: '운동 타입 코드',
		example: 'BENCH_PRESS',
	})
	type: string;

	@ApiProperty({
		description: '운동 한글명',
		example: '벤치프레스',
	})
	nameKorean: string;

	@ApiProperty({
		description: '운동 영문명',
		example: 'Bench Press',
	})
	nameEnglish: string;
}

/**
 * 입력 정보
 */
export class InputInfo {
	@ApiProperty({ description: '나이', example: 25 })
	age: number;

	@ApiProperty({ description: '체중 (kg)', example: 70 })
	bodyWeight: number;

	@ApiProperty({ description: '성별', example: 'MALE' })
	gender: string;

	@ApiPropertyOptional({ description: '현재 1RM 무게 (kg)', example: 80 })
	currentWeight?: number;
}

/**
 * 현재 레벨 정보 (currentWeight 입력시에만)
 */
export class CurrentLevelInfo {
	@ApiProperty({
		enum: StrengthLevel,
		description: '현재 레벨 코드',
		example: 'INTERMEDIATE',
	})
	level: StrengthLevel;

	@ApiProperty({
		description: '현재 레벨 한글명',
		example: '중급자',
	})
	levelKorean: string;

	@ApiProperty({
		description: '입력된 무게 (kg)',
		example: 80,
	})
	weight: number;

	@ApiProperty({
		description: '다음 레벨까지 필요한 무게 (kg)',
		example: 7.5,
	})
	weightToNextLevel: number;

	@ApiPropertyOptional({
		description: '다음 레벨 코드',
		example: 'ADVANCED',
	})
	nextLevel?: StrengthLevel;

	@ApiPropertyOptional({
		description: '다음 레벨 한글명',
		example: '고수',
	})
	nextLevelKorean?: string;
}

/**
 * Strength Level 측정 응답 데이터
 */
export class StrengthLevelData {
	@ApiProperty({ description: '운동 정보' })
	exercise: ExerciseInfo;

	@ApiProperty({ description: '입력 정보' })
	input: InputInfo;

	@ApiPropertyOptional({ description: '현재 레벨 정보 (currentWeight 입력시에만)' })
	currentLevel?: CurrentLevelInfo;

	@ApiProperty({ description: '전체 레벨 목록', type: [LevelInfo] })
	allLevels: LevelInfo[];
}

/**
 * Strength Level 측정 응답
 */
export class StrengthLevelResponse {
	@ApiProperty({
		description: '성공 여부',
		example: true,
	})
	success: boolean;

	@ApiProperty({
		description: '응답 데이터',
		type: StrengthLevelData,
	})
	data: StrengthLevelData;
}

/**
 * 레벨별 설명
 */
export const StrengthLevelDescriptions: Record<StrengthLevel, string> = {
	[StrengthLevel.BEGINNER]: '운동을 시작한 지 얼마 되지 않은 단계입니다.',
	[StrengthLevel.NOVICE]: '기본 동작을 익히고 꾸준히 운동하는 단계입니다.',
	[StrengthLevel.INTERMEDIATE]: '일반적인 피트니스 수준을 가진 사람들보다 강합니다.',
	[StrengthLevel.ADVANCED]: '상당한 수준의 근력을 보유하고 있습니다.',
	[StrengthLevel.ELITE]: '최상위 수준의 근력으로, 상위 5% 이내입니다.',
};

/**
 * 사용자 친화적 레벨명 (스크린샷 피드백 기반)
 * 기존 StrengthLevelNames와 다른 버전
 */
export const StrengthLevelFriendlyNames: Record<StrengthLevel, string> = {
	[StrengthLevel.BEGINNER]: '헬스 입문',
	[StrengthLevel.NOVICE]: '초보자',
	[StrengthLevel.INTERMEDIATE]: '중급자',
	[StrengthLevel.ADVANCED]: '고수',
	[StrengthLevel.ELITE]: '신',
};
