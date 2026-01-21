/**
 * 운동 기록 관련 헬퍼 유틸리티
 */

export interface BodyPartVolumeData {
	volume: number;
	sets: number;
	reps: number;
	count: number;
}

export interface BodyPartVolumeResult {
	bodyPart: string;
	totalVolume: number;
	totalSets: number;
	totalReps: number;
	recordCount: number;
}

export interface WorkoutRecord {
	bodyPart: string;
	volume: number;
	sets: number;
	reps: number;
}

export class WorkoutHelper {
	/**
	 * 볼륨 계산 (weight * reps * sets)
	 */
	static calculateVolume(weight: number, reps: number, sets: number): number {
		return weight * reps * sets;
	}

	/**
	 * 운동 기록 기본값 처리
	 */
	static normalizeWorkoutValues(
		weight?: number,
		reps?: number,
		sets?: number,
	): { weight: number; reps: number; sets: number; volume: number } {
		const normalizedWeight = weight ?? 0;
		const normalizedReps = reps ?? 1;
		const normalizedSets = sets ?? 1;
		const volume = this.calculateVolume(normalizedWeight, normalizedReps, normalizedSets);

		return {
			weight: normalizedWeight,
			reps: normalizedReps,
			sets: normalizedSets,
			volume,
		};
	}

	/**
	 * 부위별 볼륨 집계 (중복 로직 추출)
	 */
	static aggregateByBodyPart(records: WorkoutRecord[]): Map<string, BodyPartVolumeData> {
		const volumeMap = new Map<string, BodyPartVolumeData>();

		records.forEach((record) => {
			const existing = volumeMap.get(record.bodyPart) || {
				volume: 0,
				sets: 0,
				reps: 0,
				count: 0,
			};
			volumeMap.set(record.bodyPart, {
				volume: existing.volume + record.volume,
				sets: existing.sets + record.sets,
				reps: existing.reps + record.reps,
				count: existing.count + 1,
			});
		});

		return volumeMap;
	}

	/**
	 * 볼륨 맵을 결과 배열로 변환
	 */
	static volumeMapToResults(volumeMap: Map<string, BodyPartVolumeData>): BodyPartVolumeResult[] {
		return Array.from(volumeMap.entries()).map(([bodyPart, data]) => ({
			bodyPart,
			totalVolume: Math.round(data.volume * 100) / 100,
			totalSets: data.sets,
			totalReps: data.reps,
			recordCount: data.count,
		}));
	}

	/**
	 * 소수점 2자리로 반올림
	 */
	static roundToTwo(value: number): number {
		return Math.round(value * 100) / 100;
	}
}

