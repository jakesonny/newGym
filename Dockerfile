# 헬스장 회원관리 시스템 백엔드 — 멀티스테이지 Docker 빌드
# 1) builder: 전체 의존성으로 NestJS 앱을 빌드
# 2) runner : 실행에 필요한 산출물만 담아 컨테이너를 구동
# 마이그레이션은 TypeORM CLI(ts-node 기반)로 소스(src/migrations)를 직접 읽으므로
# runner 단계에도 devDependencies(ts-node 등)와 src 디렉터리를 함께 포함한다.

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

# 마이그레이션 적용 후 애플리케이션 기동 (배포 시점마다 스키마를 최신 상태로 맞춤)
CMD ["sh", "-c", "npm run migration:run && node dist/main.js"]
