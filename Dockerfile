# 헬스장 회원관리 시스템 백엔드 — 멀티스테이지 Docker 빌드
# 1) builder: 전체 의존성으로 NestJS 앱을 빌드
# 2) runner : 실행에 필요한 산출물만 담아 컨테이너를 구동
#
# 참고: 이 저장소의 src/migrations는 초기 개발 단계에서 synchronize:true로
# 스키마를 진화시키던 시절의 후속 변경분만 기록돼 있어, 빈 DB에 처음부터
# 순서대로 적용하면 이전 마이그레이션이 만들었어야 할 테이블/컬럼이 없어
# 실패한다(예: AddProgramFields가 memberships 테이블을 전제함). 그래서
# 컨테이너 기동 시 migration:run을 자동 실행하지 않는다 — 최초 스키마는
# `database/newgym_bootstrap.sql` + TypeORM synchronize(엔티티 기준)로
# 한 번 부트스트랩하고, 이후 스키마 변경분만 마이그레이션으로 관리할 것.

FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3001

CMD ["node", "dist/main.js"]
