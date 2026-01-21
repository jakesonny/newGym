import { AbilitySnapshot } from '../../entities/ability-snapshot.entity';
import { SnapshotNormalizer } from './snapshot-normalizer';

/**
 * 헥사곤 지표 인터페이스
 */
export interface HexagonIndicator {
	name: string;
	score: number;
}

/**
 * 헥사곤 지표 이름 상수
 */
export const HEXAGON_INDICATOR_NAMES = {
	strength: '하체 근력',
	cardio: '심폐 지구력',
	endurance: '근지구력',
	flexibility: '유연성',
	body: '체성분 밸런스',
	stability: '부상 안정성',
} as const;

/**
 * 분석 관련 헬퍼 유틸리티
 */
export class AnalyticsHelper {
	/**
	 * AbilitySnapshot 배열의 평균 계산
	 */
	static calculateAverages(snapshots: (AbilitySnapshot | null | undefined)[]): {
		strengthScore: number;
		cardioScore: number;
		enduranceScore: number;
		flexibilityScore: number;
		bodyScore: number;
		stabilityScore: number;
		totalScore: number;
	} {
		const validSnapshots = SnapshotNormalizer.normalizeArray(snapshots);

		if (validSnapshots.length === 0) {
			return {
				strengthScore: 0,
				cardioScore: 0,
				enduranceScore: 0,
				flexibilityScore: 0,
				bodyScore: 0,
				stabilityScore: 0,
				totalScore: 0,
			};
		}

		const sums = {
			strengthScore: 0,
			cardioScore: 0,
			enduranceScore: 0,
			flexibilityScore: 0,
			bodyScore: 0,
			stabilityScore: 0,
			totalScore: 0,
		};

		validSnapshots.forEach((snapshot) => {
			sums.strengthScore += snapshot.strengthScore;
			sums.cardioScore += snapshot.cardioScore;
			sums.enduranceScore += snapshot.enduranceScore;
			sums.flexibilityScore += snapshot.flexibilityScore;
			sums.bodyScore += snapshot.bodyScore;
			sums.stabilityScore += snapshot.stabilityScore;
			sums.totalScore += snapshot.totalScore;
		});

		const count = validSnapshots.length;
		return {
			strengthScore: sums.strengthScore / count,
			cardioScore: sums.cardioScore / count,
			enduranceScore: sums.enduranceScore / count,
			flexibilityScore: sums.flexibilityScore / count,
			bodyScore: sums.bodyScore / count,
			stabilityScore: sums.stabilityScore / count,
			totalScore: sums.totalScore / count,
		};
	}

	/**
	 * 스냅샷을 헥사곤 지표 배열로 변환
	 */
	static toHexagonIndicators(snapshot: AbilitySnapshot | null): HexagonIndicator[] {
		const normalized = snapshot ? SnapshotNormalizer.normalize(snapshot) : null;
		return [
			{ name: HEXAGON_INDICATOR_NAMES.strength, score: normalized?.strengthScore ?? 0 },
			{ name: HEXAGON_INDICATOR_NAMES.cardio, score: normalized?.cardioScore ?? 0 },
			{ name: HEXAGON_INDICATOR_NAMES.endurance, score: normalized?.enduranceScore ?? 0 },
			{ name: HEXAGON_INDICATOR_NAMES.flexibility, score: normalized?.flexibilityScore ?? 0 },
			{ name: HEXAGON_INDICATOR_NAMES.body, score: normalized?.bodyScore ?? 0 },
			{ name: HEXAGON_INDICATOR_NAMES.stability, score: normalized?.stabilityScore ?? 0 },
		];
	}

	/**
	 * 평균값을 헥사곤 지표 배열로 변환
	 */
	static averagesToHexagonIndicators(averages: {
		strengthScore: number;
		cardioScore: number;
		enduranceScore: number;
		flexibilityScore: number;
		bodyScore: number;
		stabilityScore: number;
	}): HexagonIndicator[] {
		return [
			{ name: HEXAGON_INDICATOR_NAMES.strength, score: Math.round(averages.strengthScore) },
			{ name: HEXAGON_INDICATOR_NAMES.cardio, score: Math.round(averages.cardioScore) },
			{ name: HEXAGON_INDICATOR_NAMES.endurance, score: Math.round(averages.enduranceScore) },
			{ name: HEXAGON_INDICATOR_NAMES.flexibility, score: Math.round(averages.flexibilityScore) },
			{ name: HEXAGON_INDICATOR_NAMES.body, score: Math.round(averages.bodyScore) },
			{ name: HEXAGON_INDICATOR_NAMES.stability, score: Math.round(averages.stabilityScore) },
		];
	}

	/**
	 * 빈 헥사곤 지표 배열 생성
	 */
	static emptyHexagonIndicators(): HexagonIndicator[] {
		return [
			{ name: HEXAGON_INDICATOR_NAMES.strength, score: 0 },
			{ name: HEXAGON_INDICATOR_NAMES.cardio, score: 0 },
			{ name: HEXAGON_INDICATOR_NAMES.endurance, score: 0 },
			{ name: HEXAGON_INDICATOR_NAMES.flexibility, score: 0 },
			{ name: HEXAGON_INDICATOR_NAMES.body, score: 0 },
			{ name: HEXAGON_INDICATOR_NAMES.stability, score: 0 },
		];
	}

	/**
	 * 백분위 계산
	 */
	static calculatePercentile(memberValue: number, averageValue: number): number {
		if (averageValue === 0) return 50;
		const ratio = memberValue / averageValue;
		return Math.min(100, Math.max(0, (ratio - 0.5) * 100 + 50));
	}

	/**
	 * 백분위 객체 계산
	 */
	static calculatePercentiles(
		memberSnapshot: AbilitySnapshot,
		averages: {
			strengthScore: number;
			cardioScore: number;
			enduranceScore: number;
			flexibilityScore: number;
			bodyScore: number;
			stabilityScore: number;
			totalScore: number;
		},
	): {
		strengthScore: number;
		cardioScore: number;
		enduranceScore: number;
		flexibilityScore: number;
		bodyScore: number;
		stabilityScore: number;
		totalScore: number;
	} {
		const normalized = SnapshotNormalizer.normalize(memberSnapshot);

		return {
			strengthScore: this.calculatePercentile(normalized.strengthScore, averages.strengthScore),
			cardioScore: this.calculatePercentile(normalized.cardioScore, averages.cardioScore),
			enduranceScore: this.calculatePercentile(normalized.enduranceScore, averages.enduranceScore),
			flexibilityScore: this.calculatePercentile(normalized.flexibilityScore, averages.flexibilityScore),
			bodyScore: this.calculatePercentile(normalized.bodyScore, averages.bodyScore),
			stabilityScore: this.calculatePercentile(normalized.stabilityScore, averages.stabilityScore),
			totalScore: this.calculatePercentile(normalized.totalScore, averages.totalScore),
		};
	}
}

