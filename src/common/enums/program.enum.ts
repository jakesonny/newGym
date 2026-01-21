/**
 * 프로그램 목표 유형
 */
export enum GoalType {
	WEIGHT_LOSS = 'WEIGHT_LOSS', // 체중 감량
	MUSCLE_GAIN = 'MUSCLE_GAIN', // 근육량 증가
	STRENGTH_UP = 'STRENGTH_UP', // 근력 상승
	ENDURANCE = 'ENDURANCE', // 체력 증진
	BODY_FAT_LOSS = 'BODY_FAT_LOSS', // 체지방 감량
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
	[GoalType.CUSTOM]: '기타',
};

/**
 * 목표 유형별 단위
 */
export const GoalTypeUnits: Record<GoalType, string> = {
	[GoalType.WEIGHT_LOSS]: 'kg',
	[GoalType.MUSCLE_GAIN]: 'kg',
	[GoalType.STRENGTH_UP]: 'kg',
	[GoalType.ENDURANCE]: '분',
	[GoalType.BODY_FAT_LOSS]: '%',
	[GoalType.CUSTOM]: '',
};

/**
 * 위험 상태 (회원 진행 상황)
 */
export enum RiskStatus {
	GREEN = 'GREEN', // 정상 진행 (70% 이상)
	YELLOW = 'YELLOW', // 주의 필요 (30-70%)
	RED = 'RED', // 위험 (30% 미만)
}

/**
 * 위험 상태별 한글명
 */
export const RiskStatusNames: Record<RiskStatus, string> = {
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
