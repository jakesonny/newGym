/**
 * 날짜 범위 헬퍼 유틸리티
 */
export class DateRangeHelper {
	/**
	 * 주간 범위 계산 (월요일 ~ 일요일)
	 */
	static getWeekRange(date: Date = new Date()): { start: Date; end: Date } {
		const dayOfWeek = date.getDay();
		const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

		const start = new Date(date);
		start.setDate(date.getDate() - diff);
		start.setHours(0, 0, 0, 0);

		const end = new Date(date);
		end.setHours(23, 59, 59, 999);

		return { start, end };
	}

	/**
	 * 월간 범위 계산
	 */
	static getMonthRange(date: Date = new Date()): { start: Date; end: Date } {
		const start = new Date(date.getFullYear(), date.getMonth(), 1);
		start.setHours(0, 0, 0, 0);

		const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		end.setHours(23, 59, 59, 999);

		return { start, end };
	}

	/**
	 * 기간 타입에 따른 범위 계산 (week, month)
	 */
	static getRangeFromPeriod(period: 'week' | 'month'): { startDate: string; endDate: string } {
		const range = period === 'month' ? this.getMonthRange() : this.getWeekRange();
		return {
			startDate: this.formatDateString(range.start),
			endDate: this.formatDateString(range.end),
		};
	}

	/**
	 * 이전 기간 범위 계산
	 */
	static getPreviousRange(startDate: string, endDate: string): { startDate: string; endDate: string } {
		const start = new Date(startDate);
		const end = new Date(endDate);
		const diff = end.getTime() - start.getTime() + (24 * 60 * 60 * 1000); // 1일 추가

		const prevStart = new Date(start.getTime() - diff);
		const prevEnd = new Date(end.getTime() - diff);

		return {
			startDate: this.formatDateString(prevStart),
			endDate: this.formatDateString(prevEnd),
		};
	}

	/**
	 * N일 전 범위 계산
	 */
	static getDaysAgoRange(days: number, date: Date = new Date()): { start: Date; end: Date } {
		const start = new Date(date);
		start.setDate(date.getDate() - days);
		start.setHours(0, 0, 0, 0);

		const end = new Date(date);
		end.setHours(23, 59, 59, 999);

		return { start, end };
	}

	/**
	 * 날짜 문자열을 Date로 변환 (YYYY-MM-DD 형식)
	 */
	static parseDateString(dateString: string): Date {
		return new Date(dateString);
	}

	/**
	 * Date를 YYYY-MM-DD 형식 문자열로 변환
	 */
	static formatDateString(date: Date): string {
		return date.toISOString().split('T')[0];
	}

	/**
	 * Date 또는 string을 YYYY-MM-DD 형식 문자열로 변환
	 */
	static toDateString(date: Date | string): string {
		if (typeof date === 'string') return date.split('T')[0];
		return date.toISOString().split('T')[0];
	}
}

