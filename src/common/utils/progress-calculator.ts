import {
	GoalType,
	GoalDirection,
	RiskStatus,
	BlockPurpose,
	GoalTypeDirections,
	FLAT_THRESHOLDS,
	RAPID_THRESHOLDS,
	MIN_MEASUREMENTS_FOR_TREND,
	MEASUREMENT_OVERDUE_DAYS,
} from '../enums';

/**
 * 추세 판정 결과
 */
export interface TrendAnalysisResult {
	status: RiskStatus;
	flags: string[];
	shortTermDelta?: number; // 최근 변화량
	longTermDelta?: number; // 전체 변화량
}

/**
 * 4주 블록 마일스톤
 */
export interface MilestoneBlock {
	blockNumber: number;
	startWeek: number;
	endWeek: number;
	purpose: BlockPurpose;
	targetDate: Date;
}

/**
 * 프로그램 진행률 및 위험 상태 계산 유틸리티 (Phase 2: 추세 기반)
 */
export class ProgressCalculator {
	/**
	 * 목표 유형별 진행률 계산 (0-100% 캡 적용)
	 * @param goalType 목표 유형
	 * @param startValue 시작 수치
	 * @param currentValue 현재 수치
	 * @param targetValue 목표 수치
	 * @returns 진행률 (0-100)
	 */
	static calculateProgress(
		goalType: GoalType,
		startValue: number,
		currentValue: number,
		targetValue: number,
	): number {
		// 유효성 검사
		if (startValue === targetValue) {
			return currentValue === targetValue ? 100 : 0;
		}

		// 방향 결정
		const direction = GoalTypeDirections[goalType];

		let progress: number;

		if (direction === GoalDirection.DECREASE) {
			// 감소 목표: (시작 - 현재) / (시작 - 목표) * 100
			const decrease = startValue - currentValue;
			const targetDecrease = startValue - targetValue;
			progress = targetDecrease !== 0 ? (decrease / targetDecrease) * 100 : 0;
		} else {
			// 증가 목표: (현재 - 시작) / (목표 - 시작) * 100
			const increase = currentValue - startValue;
			const targetIncrease = targetValue - startValue;
			progress = targetIncrease !== 0 ? (increase / targetIncrease) * 100 : 0;
		}

		// 0-100% 캡 적용 (Phase 2)
		return Math.min(100, Math.max(0, Math.round(progress * 10) / 10));
	}

	/**
	 * 추세 기반 위험 상태 판정 (Phase 2 핵심)
	 * @param measurements 측정값 배열 (오래된 순 → 최근 순)
	 * @param goalType 목표 유형
	 * @returns 추세 분석 결과 (status + flags)
	 */
	static calculateRiskStatusByTrend(
		measurements: number[],
		goalType: GoalType,
	): TrendAnalysisResult {
		const flags: string[] = [];

		// 1. 측정 횟수 확인 - 2회 미만이면 FOUNDATION
		if (measurements.length < MIN_MEASUREMENTS_FOR_TREND) {
			return { status: RiskStatus.FOUNDATION, flags };
		}

		// 2. 방향 결정
		const direction = GoalTypeDirections[goalType];

		// 3. 최근 변화량 계산 (단기 추세)
		const recent = measurements.slice(-2);
		const shortTermDelta = recent[1] - recent[0];
		const absShortTermDelta = Math.abs(shortTermDelta);

		// 4. 전체 변화량 계산 (장기 추세)
		const longTermDelta = measurements[measurements.length - 1] - measurements[0];

		// 5. MAINTENANCE 특수 처리 (변화 없음 = 정상)
		if (goalType === GoalType.MAINTENANCE) {
			return this.calculateMaintenanceStatus(
				absShortTermDelta,
				shortTermDelta,
				goalType,
				flags,
			);
		}

		// 6. 방향성 판단
		const isImproving = direction === GoalDirection.DECREASE
			? shortTermDelta < 0 // 감소 목표: 줄어들면 개선
			: shortTermDelta > 0; // 증가 목표: 늘어나면 개선

		const longTermImproving = direction === GoalDirection.DECREASE
			? longTermDelta < 0
			: longTermDelta > 0;

		// 7. 급변 체크
		const rapidThreshold = RAPID_THRESHOLDS[goalType];
		if (absShortTermDelta >= rapidThreshold) {
			if (isImproving) {
				flags.push('rapid_progress');
			} else {
				flags.push('rapid_decline');
			}
		}

		// 8. 정체 체크
		const flatThreshold = FLAT_THRESHOLDS[goalType];
		if (absShortTermDelta <= flatThreshold) {
			return {
				status: RiskStatus.YELLOW,
				flags,
				shortTermDelta,
				longTermDelta,
			};
		}

		// 9. 방향 기반 최종 판정
		if (isImproving) {
			return {
				status: RiskStatus.GREEN,
				flags,
				shortTermDelta,
				longTermDelta,
			};
		} else {
			// 단기 역행이지만 장기적으로 개선 중이면 YELLOW
			if (measurements.length >= 3 && longTermImproving) {
				return {
					status: RiskStatus.YELLOW,
					flags,
					shortTermDelta,
					longTermDelta,
				};
			}
			// 지속적 역행 → RED
			return {
				status: RiskStatus.RED,
				flags,
				shortTermDelta,
				longTermDelta,
			};
		}
	}

	/**
	 * MAINTENANCE (유지) 목표 상태 판정
	 */
	private static calculateMaintenanceStatus(
		absShortTermDelta: number,
		shortTermDelta: number,
		goalType: GoalType,
		flags: string[],
	): TrendAnalysisResult {
		const flatThreshold = FLAT_THRESHOLDS[goalType];
		const rapidThreshold = RAPID_THRESHOLDS[goalType];

		// 변화 없음 = GREEN (정상 유지)
		if (absShortTermDelta <= flatThreshold) {
			return { status: RiskStatus.GREEN, flags };
		}

		// 급변 = YELLOW (체크 필요)
		if (absShortTermDelta >= rapidThreshold) {
			flags.push('rapid_change');
			return { status: RiskStatus.YELLOW, flags };
		}

		// 중간 변화 = YELLOW
		return { status: RiskStatus.YELLOW, flags };
	}

	/**
	 * 측정 미실시 여부 확인
	 * @param lastMeasurementAt 마지막 측정 일시
	 * @returns 2주 이상 경과 여부
	 */
	static isMeasurementOverdue(lastMeasurementAt: Date | null | undefined): boolean {
		if (!lastMeasurementAt) return false;

		const now = new Date();
		const diffDays = (now.getTime() - lastMeasurementAt.getTime()) / (1000 * 60 * 60 * 24);
		return diffDays >= MEASUREMENT_OVERDUE_DAYS;
	}

	/**
	 * 프로그램 남은 일수 계산
	 * @param endDate 프로그램 종료일
	 * @returns 남은 일수 (D-XX 형식용)
	 */
	static calculateDaysRemaining(endDate: Date): number {
		const now = new Date();
		const diffTime = endDate.getTime() - now.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return Math.max(0, diffDays);
	}

	/**
	 * 4주 블록 마일스톤 생성 (Phase 2)
	 * @param startDate 프로그램 시작일
	 * @param durationWeeks 프로그램 기간 (4, 8, 12주)
	 * @returns 4주 블록 배열
	 */
	static generateMilestoneBlocks(
		startDate: Date,
		durationWeeks: 4 | 8 | 12,
	): MilestoneBlock[] {
		const blocks: MilestoneBlock[] = [];
		const blockCount = durationWeeks / 4;

		for (let i = 0; i < blockCount; i++) {
			const startWeek = i * 4 + 1;
			const endWeek = (i + 1) * 4;

			// 블록 목적 결정
			let purpose: BlockPurpose;
			if (i === 0) {
				purpose = BlockPurpose.ADAPTATION; // 1블록: 적응
			} else if (i === blockCount - 1) {
				purpose = BlockPurpose.CONSOLIDATION; // 마지막 블록: 정착
			} else {
				purpose = BlockPurpose.INTENSITY; // 중간 블록: 강도
			}

			// 블록 종료일 계산
			const targetDate = new Date(startDate);
			targetDate.setDate(targetDate.getDate() + endWeek * 7);

			blocks.push({
				blockNumber: i + 1,
				startWeek,
				endWeek,
				purpose,
				targetDate,
			});
		}

		return blocks;
	}

	/**
	 * 주차별 마일스톤 날짜 생성 (기존 호환용)
	 * @deprecated generateMilestoneBlocks 사용 권장
	 */
	static generateMilestoneDates(
		startDate: Date,
		durationWeeks: number,
	): Array<{ weekNumber: number; targetDate: Date }> {
		const milestones: Array<{ weekNumber: number; targetDate: Date }> = [];

		for (let week = 1; week <= durationWeeks; week++) {
			const targetDate = new Date(startDate);
			targetDate.setDate(targetDate.getDate() + week * 7);

			milestones.push({
				weekNumber: week,
				targetDate,
			});
		}

		return milestones;
	}

	/**
	 * 목표 유형에 따른 측정값 추출
	 * @param goalType 목표 유형
	 * @param measurements 측정값 객체
	 * @returns 해당 목표에 맞는 측정값
	 */
	static extractMeasurementValue(
		goalType: GoalType,
		measurements: {
			weight?: number;
			muscleMass?: number;
			bodyFat?: number;
			benchPress1RM?: number;
			squat1RM?: number;
			deadlift1RM?: number;
			stepTestTime?: number;
		},
	): number | null {
		switch (goalType) {
			case GoalType.WEIGHT_LOSS:
			case GoalType.MAINTENANCE:
				return measurements.weight ?? null;
			case GoalType.STRENGTH_UP:
				// 빅3 합계 또는 개별 값
				const big3 = [
					measurements.benchPress1RM,
					measurements.squat1RM,
					measurements.deadlift1RM,
				].filter((v) => v !== undefined && v !== null) as number[];
				return big3.length > 0 ? big3.reduce((a, b) => a + b, 0) : null;
			case GoalType.ENDURANCE:
				return measurements.stepTestTime ?? null;
			default:
				return null;
		}
	}

	/**
	 * 목표 방향 조회
	 * @param goalType 목표 유형
	 * @returns 방향 (INCREASE/DECREASE)
	 */
	static getGoalDirection(goalType: GoalType): GoalDirection {
		return GoalTypeDirections[goalType];
	}
}
