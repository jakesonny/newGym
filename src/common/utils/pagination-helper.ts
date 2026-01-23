/**
 * 페이지네이션 관련 유틸리티 함수
 */

export interface PaginationParams {
	page: number;
	pageSize: number;
}

/**
 * 쿼리 파라미터에서 페이지네이션 정보를 파싱
 * @param page - 페이지 번호 (문자열, 선택)
 * @param pageSize - 페이지 크기 (문자열, 선택)
 * @param defaultPageSize - 기본 페이지 크기 (기본값: 10)
 * @returns 파싱된 페이지네이션 파라미터
 */
export function parsePagination(
	page?: string,
	pageSize?: string,
	defaultPageSize: number = 10,
): PaginationParams {
	const pageNum = page ? parseInt(page, 10) : 1;
	const pageSizeNum = pageSize ? parseInt(pageSize, 10) : defaultPageSize;
	return {
		page: pageNum > 0 ? pageNum : 1,
		pageSize: pageSizeNum > 0 ? pageSizeNum : defaultPageSize,
	};
}
