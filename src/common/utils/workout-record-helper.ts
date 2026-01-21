import { DateRangeHelper } from './date-range-helper';

/**
 * 1RM 기록 정보
 */
export interface OneRepMaxInfo {
	oneRepMax: number;
	strengthLevel: string | null;
	workoutDate: string;
	relativeStrength?: number;
}

/**
 * 운동 기록 인터페이스
 */
export interface WorkoutRecordData {
	oneRepMax?: number | null;
	strengthLevel?: string | null;
	relativeStrength?: number | null;
	workoutDate: Date;
}

/**
 * 운동 기록 처리 헬퍼
 */
export class WorkoutRecordHelper {
	/**
	 * 1RM이 있는 기록만 필터링
	 */
	static filterRecordsWithOneRM<T extends WorkoutRecordData>(records: T[]): T[] {
		return records.filter((r) => r.oneRepMax !== null && r.oneRepMax !== undefined);
	}

	/**
	 * 기록에서 히스토리 배열 생성
	 */
	static buildHistory(records: WorkoutRecordData[]): OneRepMaxInfo[] {
		return records.map((record) => ({
			oneRepMax: record.oneRepMax!,
			workoutDate: DateRangeHelper.toDateString(record.workoutDate),
			strengthLevel: record.strengthLevel || null,
		}));
	}

	/**
	 * 가장 최근 기록 가져오기
	 */
	static getLatestRecord<T extends WorkoutRecordData>(records: T[]): T | null {
		return records.length > 0 ? records[records.length - 1] : null;
	}

	/**
	 * 최고 1RM 기록 가져오기
	 */
	static getBestRecord<T extends WorkoutRecordData>(records: T[]): T | null {
		if (records.length === 0) return null;
		return records.reduce((best, record) => {
			if (!best || (record.oneRepMax! > best.oneRepMax!)) {
				return record;
			}
			return best;
		}, null as T | null);
	}

	/**
	 * 기록을 1RM 정보로 변환
	 */
	static toOneRepMaxInfo(record: WorkoutRecordData, memberWeight?: number): OneRepMaxInfo {
		return {
			oneRepMax: record.oneRepMax!,
			strengthLevel: record.strengthLevel || null,
			workoutDate: DateRangeHelper.toDateString(record.workoutDate),
			relativeStrength: record.relativeStrength || 
				(memberWeight ? (record.oneRepMax! / memberWeight) * 100 : undefined),
		};
	}

	/**
	 * 날짜별로 최고 1RM 그룹화
	 */
	static groupByDateWithMaxOneRM(
		records: WorkoutRecordData[],
	): Map<string, { oneRepMax: number; strengthLevel: string | null }> {
		const dateMap = new Map<string, { oneRepMax: number; strengthLevel: string | null }>();

		records.forEach((record) => {
			if (record.oneRepMax !== null && record.oneRepMax !== undefined) {
				const date = DateRangeHelper.toDateString(record.workoutDate);
				const existing = dateMap.get(date);
				if (!existing || record.oneRepMax > existing.oneRepMax) {
					dateMap.set(date, {
						oneRepMax: record.oneRepMax,
						strengthLevel: record.strengthLevel || null,
					});
				}
			}
		});

		return dateMap;
	}

	/**
	 * 날짜별로 볼륨 합계 그룹화
	 */
	static groupByDateWithVolume(
		records: Array<{ workoutDate: Date; volume: number; bodyPart?: string }>,
	): Map<string, { totalVolume: number; bodyPartMap: Map<string, number> }> {
		const dateMap = new Map<string, { totalVolume: number; bodyPartMap: Map<string, number> }>();

		records.forEach((record) => {
			const date = DateRangeHelper.toDateString(record.workoutDate);
			const existing = dateMap.get(date) || {
				totalVolume: 0,
				bodyPartMap: new Map<string, number>(),
			};

			existing.totalVolume += record.volume;
			if (record.bodyPart) {
				const bodyPartVolume = existing.bodyPartMap.get(record.bodyPart) || 0;
				existing.bodyPartMap.set(record.bodyPart, bodyPartVolume + record.volume);
			}

			dateMap.set(date, existing);
		});

		return dateMap;
	}
}
