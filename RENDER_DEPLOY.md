# Render 백엔드 배포 가이드

이 문서는 NestJS 백엔드를 Render.com에 배포하는 방법을 설명합니다.

## 1. Render 웹 서비스 생성

1. Render 대시보드에서 **New +** 버튼 클릭 -> **Web Service** 선택
2. GitHub 저장소 연결
3. 서비스 이름 설정 (예: `gym-membership-api`)
4. 환경 설정:
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run migration:run && npm run start:prod`

## 2. 환경 변수 설정 (Environment Variables)

Render 대시보드의 **Environment** 탭에서 다음 변수들을 설정하세요:

| 변수명 | 값 예시 | 설명 |
|--------|---------|------|
| `NODE_ENV` | `production` | 프로덕션 모드 |
| `PORT` | `3001` | 서버 포트 (Render는 자동으로 감지하기도 함) |
| `DATABASE_URL` | `postgresql://...` | Render PostgreSQL 서비스의 Internal DB URL |
| `JWT_SECRET` | `your-secure-secret` | 강력한 보안 문자열 |
| `JWT_EXPIRES_IN` | `7d` | 토큰 만료 시간 |
| `FRONTEND_URL` | `https://your-app.vercel.app` | Vercel 프론트엔드 주소 |

## 3. 데이터베이스 설정 (PostgreSQL)

1. Render 대시보드에서 **New +** 버튼 클릭 -> **PostgreSQL** 선택
2. 데이터베이스 이름 설정
3. 생성된 데이터베이스의 **Internal Database URL**을 복사하여 백엔드 서비스의 `DATABASE_URL` 환경 변수에 붙여넣기

## 4. 마이그레이션 실행

Render의 **Build Command**나 **Start Command**에 마이그레이션 실행 명령을 포함하는 것을 권장합니다:
`npm run migration:run && npm run start:prod`

## 5. 확인 사항

- API 주소 확인: `https://gym-membership-api.onrender.com`
- Swagger 문서 확인: `https://gym-membership-api.onrender.com/api`
- 프론트엔드 CORS 허용 여부 확인
