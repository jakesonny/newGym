/**
 * 프로그램 목표 유형
 */
export enum GoalType {
	WEIGHT_LOSS = 'WEIGHT_LOSS', // 체중 감량
	MUSCLE_GAIN = 'MUSCLE_GAIN', // 근육량 증가
	STRENGTH_UP = 'STRENGTH_UP', // 근력 상승
	ENDURANCE = 'ENDURANCE', // 체력 증진 (stepTestTime 기준)
	BODY_FAT_LOSS = 'BODY_FAT_LOSS', // 체지방 감량
	MAINTENANCE = 'MAINTENANCE', // 유지 (변화 없음 = 정상)
	CUSTOM = 'CUSTOM', // 기타
}

/**
 * 목표 유형별 한글명
 */
export const GoalTypeNames: Record<GoalType, string> = {
	[GoalType.WEIGHT_LOSS]: '체중 감량',
	[GoalType.MUSCLE_GAIN]: '근육량 증가',
	[GoalType.STRENGTH_UP]: '근력 상승',
	[GoalType.ENDURANCE]: '체력 증진',
	[GoalType.BODY_FAT_LOSS]: '체지방 감량',
	[GoalType.MAINTENANCE]: '건강 유지',
	[GoalType.CUSTOM]: '기타',
};

/**
 * 목표 유형별 단위
 */
export const GoalTypeUnits: Record<GoalType, string> = {
	[GoalType.WEIGHT_LOSS]: 'kg',
	[GoalType.MUSCLE_GAIN]: 'kg',
	[GoalType.STRENGTH_UP]: 'kg',
	[GoalType.ENDURANCE]: '초', // stepTestTime (초 단위)
	[GoalType.BODY_FAT_LOSS]: '%',
	[GoalType.MAINTENANCE]: 'kg',
	[GoalType.CUSTOM]: '',
};

/**
 * 목표 방향
 */
export enum GoalDirection {
	INCREASE = 'INCREASE', // 증가 목표
	DECREASE = 'DECREASE', // 감소 목표
}

/**
 * 목표 유형별 방향 (CUSTOM은 goalDirection 필드로 오버라이드)
 */
export const GoalTypeDirections: Record<GoalType, GoalDirection> = {
	[GoalType.WEIGHT_LOSS]: GoalDirection.DECREASE,
	[GoalType.BODY_FAT_LOSS]: GoalDirection.DECREASE,
	[GoalType.ENDURANCE]: GoalDirection.DECREASE, // stepTestTime 낮을수록 좋음
	[GoalType.MUSCLE_GAIN]: GoalDirection.INCREASE,
	[GoalType.STRENGTH_UP]: GoalDirection.INCREASE,
	[GoalType.MAINTENANCE]: GoalDirection.INCREASE, // 기본값 (실제론 변화 없음이 정상)
	[GoalType.CUSTOM]: GoalDirection.INCREASE, // 기본값, goalDirection으로 오버라이드
};

/**
 * 위험 상태 (회원 진행 상황) - 추세 기반 판정
 */
export enum RiskStatus {
	FOUNDATION = 'FOUNDATION', // 기초 단계 (측정 0~1회, 추세 판정 불가)
	GREEN = 'GREEN', // 정상 진행 (목표 방향으로 개선 중)
	YELLOW = 'YELLOW', // 주의 필요 (정체 또는 단기 역행)
	RED = 'RED', // 위험 (지속적 역행)
}

/**
 * 위험 상태별 한글명
 */
export const RiskStatusNames: Record<RiskStatus, string> = {
	[RiskStatus.FOUNDATION]: '기초 단계',
	[RiskStatus.GREEN]: '정상',
	[RiskStatus.YELLOW]: '주의',
	[RiskStatus.RED]: '위험',
};

/**
 * 프로그램 기간 (주)
 */
export enum ProgramDuration {
	FOUR_WEEKS = 4,
	EIGHT_WEEKS = 8,
	TWELVE_WEEKS = 12,
}

/**
 * 4주 블록 목적
 */
export enum BlockPurpose {
	ADAPTATION = 'ADAPTATION', // 적응 (1블록)
	INTENSITY = 'INTENSITY', // 볼륨/강도 (중간 블록)
	CONSOLIDATION = 'CONSOLIDATION', // 정착/습관화 (마지막 블록)
}

/**
 * 블록 목적별 한글명
 */
export const BlockPurposeNames: Record<BlockPurpose, string> = {
	[BlockPurpose.ADAPTATION]: '적응',
	[BlockPurpose.INTENSITY]: '강도 향상',
	[BlockPurpose.CONSOLIDATION]: '정착/습관화',
};

// ============================================================
// 추세 판정 상수 (Phase 2)
// ============================================================

/**
 * 추세 판정에 필요한 최소 측정 횟수
 */
export const MIN_MEASUREMENTS_FOR_TREND = 2;

/**
 * 측정 미실시 경고 기준 (일)
 */
export const MEASUREMENT_OVERDUE_DAYS = 14;

/**
 * 정체(FLAT) 임계값 - 이 범위 내 변화는 "정체"로 판정
 * (현업 피드백 후 조정 가능)
 */
export const FLAT_THRESHOLDS: Record<GoalType, number> = {
	[GoalType.WEIGHT_LOSS]: 0.5, // kg
	[GoalType.BODY_FAT_LOSS]: 0.3, // %
	[GoalType.MUSCLE_GAIN]: 0.1, // kg
	[GoalType.STRENGTH_UP]: 2.5, // kg
	[GoalType.ENDURANCE]: 5, // 초
	[GoalType.MAINTENANCE]: 0.5, // kg (체중 기준)
	[GoalType.CUSTOM]: 0, // 사용 안 함
};

/**
 * 급변(RAPID) 임계값 - 이 이상 변화는 "급변"으로 판정 (rapid_progress 플래그)
 * (현업 피드백 후 조정 가능)
 */
export const RAPID_THRESHOLDS: Record<GoalType, number> = {
	[GoalType.WEIGHT_LOSS]: 1.5, // kg/주
	[GoalType.BODY_FAT_LOSS]: 1.0, // %/주
	[GoalType.MUSCLE_GAIN]: 0.3, // kg/주
	[GoalType.STRENGTH_UP]: 7.5, // kg/주
	[GoalType.ENDURANCE]: 20, // 초/주
	[GoalType.MAINTENANCE]: 1.0, // kg/주
	[GoalType.CUSTOM]: 0, // 사용 안 함
};
