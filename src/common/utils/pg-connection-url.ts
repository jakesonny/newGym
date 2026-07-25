/**
 * 연결 대상이 SSL을 요구하는 클라우드 Postgres인지 호스트명으로 판단합니다.
 * DB_HOST 개별 설정과 DATABASE_URL 단일 문자열 두 경로 모두에서 재사용하기 위해
 * 여기 하나로 모아둡니다(기존에는 DB_HOST만 검사해 DATABASE_URL 경로에서 SSL이
 * 항상 꺼지는 버그가 있었음 — Neon/RDS 등 DATABASE_URL만 쓰는 호스트가 늘면서 발견).
 */
export function isSslRequiredHost(hostOrUrl: string | undefined): boolean {
  if (!hostOrUrl) {
    return false;
  }
  return (
    hostOrUrl.includes("render.com") ||
    hostOrUrl.includes("amazonaws.com") ||
    hostOrUrl.includes("neon.tech") ||
    hostOrUrl.includes("sslmode=require")
  );
}

/**
 * PostgreSQL 연결 URL에 startup 옵션으로 search_path를 넣습니다.
 * TypeORM `schema`만으로는 일부 쿼리가 `public`만 보는 경우가 있어,
 * libpq/node-pg가 인식하는 `options` 쿼리 파라미터로 고정합니다.
 */
export function appendPgSearchPath(
  databaseUrl: string,
  schema: string,
): string {
  const trimmed = databaseUrl.trim();
  if (!trimmed) {
    return trimmed;
  }
  // uuid-ossp/pgcrypto 확장 함수(uuid_generate_v4 등)는 보통 public 스키마에 설치되므로,
  // 앱 스키마만 search_path에 넣으면 그 함수들을 못 찾는다. public을 항상 폴백으로 포함한다.
  const optionsValue = `-c search_path=${schema},public`;
  try {
    const u = new URL(trimmed);
    u.searchParams.set("options", optionsValue);
    return u.href;
  } catch {
    const encoded = encodeURIComponent(optionsValue);
    const sep = trimmed.includes("?") ? "&" : "?";
    return `${trimmed}${sep}options=${encoded}`;
  }
}
