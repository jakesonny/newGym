import { GoalType, RiskStatus } from '../enums';

/**
 * 프로그램 진행률 및 위험 상태 계산 유틸리티
 */
export class ProgressCalculator {
	/**
	 * 목표 유형별 진행률 계산
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

		let progress: number;

		switch (goalType) {
			case GoalType.WEIGHT_LOSS:
			case GoalType.BODY_FAT_LOSS:
				// 감소 목표: (시작 - 현재) / (시작 - 목표) * 100
				const decrease = startValue - currentValue;
				const targetDecrease = startValue - targetValue;
				progress = (decrease / targetDecrease) * 100;
				break;

			case GoalType.MUSCLE_GAIN:
			case GoalType.STRENGTH_UP:
			case GoalType.ENDURANCE:
				// 증가 목표: (현재 - 시작) / (목표 - 시작) * 100
				const increase = currentValue - startValue;
				const targetIncrease = targetValue - startValue;
				progress = (increase / targetIncrease) * 100;
				break;

			case GoalType.CUSTOM:
			default:
				// 커스텀: 증가 목표로 가정
				const customIncrease = currentValue - startValue;
				const customTargetIncrease = targetValue - startValue;
				progress = customTargetIncrease !== 0 
					? (customIncrease / customTargetIncrease) * 100 
					: 0;
				break;
		}

		// 0-100 범위로 제한 (100% 초과 허용 - Elite 판정용)
		return Math.max(0, Math.round(progress * 10) / 10);
	}

	/**
	 * 위험 상태 판정
	 * 예상 진행률 대비 실제 진행률로 판정
	 * @param startDate 프로그램 시작일
	 * @param endDate 프로그램 종료일
	 * @param currentProgress 현재 진행률
	 * @returns 위험 상태 (GREEN/YELLOW/RED)
	 */
	static calculateRiskStatus(
		startDate: Date,
		endDate: Date,
		currentProgress: number,
	): RiskStatus {
		const now = new Date();
		
		// 아직 시작 전이면 GREEN
		if (now < startDate) {
			return RiskStatus.GREEN;
		}

		// 이미 종료된 경우
		if (now > endDate) {
			if (currentProgress >= 100) return RiskStatus.GREEN;
			if (currentProgress >= 70) return RiskStatus.YELLOW;
			return RiskStatus.RED;
		}

		const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
		const elapsedDays = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
		
		// 예상 진행률 계산
		const expectedProgress = (elapsedDays / totalDays) * 100;
		
		// 예상 대비 실제 진행률 비율
		const ratio = expectedProgress > 0 ? currentProgress / expectedProgress : 1;

		// 위험 상태 판정 (조정된 기준)
		// GREEN: 70% 이상, YELLOW: 30-70%, RED: 30% 미만
		if (ratio >= 0.7) return RiskStatus.GREEN;
		if (ratio >= 0.3) return RiskStatus.YELLOW;
		return RiskStatus.RED;
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
	 * 주차별 마일스톤 날짜 생성
	 * @param startDate 프로그램 시작일
	 * @param durationWeeks 프로그램 기간 (주)
	 * @returns 주차별 목표 날짜 배열
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
		},
	): number | null {
		switch (goalType) {
			case GoalType.WEIGHT_LOSS:
				return measurements.weight ?? null;
			case GoalType.MUSCLE_GAIN:
				return measurements.muscleMass ?? null;
			case GoalType.BODY_FAT_LOSS:
				return measurements.bodyFat ?? null;
			case GoalType.STRENGTH_UP:
				// 빅3 합계 또는 개별 값
				const big3 = [
					measurements.benchPress1RM,
					measurements.squat1RM,
					measurements.deadlift1RM,
				].filter((v) => v !== undefined && v !== null) as number[];
				return big3.length > 0 ? big3.reduce((a, b) => a + b, 0) : null;
			default:
				return null;
		}
	}
}
