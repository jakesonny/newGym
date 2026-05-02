/**
 * PostgreSQL 연결 URL에 startup 옵션으로 search_path를 넣습니다.
 * TypeORM `schema`만으로는 일부 쿼리가 `public`만 보는 경우가 있어,
 * libpq/node-pg가 인식하는 `options` 쿼리 파라미터로 고정합니다.
 */
export function appendPgSearchPath(databaseUrl: string, schema: string): string {
	const trimmed = databaseUrl.trim();
	if (!trimmed) {
		return trimmed;
	}
	try {
		const u = new URL(trimmed);
		u.searchParams.set('options', `-c search_path=${schema},public`);
		return u.href;
	} catch {
		return trimmed;
	}
}
