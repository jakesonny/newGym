# 백엔드 개발 백로그 (추후 구현 항목)

> 이 문서는 현재 개발 중 미룬 항목들과 추후 구현 예정인 기능들을 관리합니다.
> 각 항목은 우선순위와 관련 Phase를 표시합니다.

---

## 📋 Phase 3에서 미룬 항목

### 초기 측정값 저장 확장
- **현재 상태**: `POST /api/members/full`에서 `initialMeasurement` 필드를 받지만, `weight`만 저장됨
- **미룬 항목**:
  - [ ] `muscleMass` (골격근량) → Member 또는 Assessment에 저장
  - [ ] `bodyFat` (체지방률) → Member 또는 Assessment에 저장
  - [ ] `benchPress1RM` → WorkoutRecord 또는 Assessment에 저장
  - [ ] `squat1RM` → WorkoutRecord 또는 Assessment에 저장
  - [ ] `deadlift1RM` → WorkoutRecord 또는 Assessment에 저장
- **구현 방안**:
  - 옵션 A: Phase 3 API에서 초기 Assessment 자동 생성
  - 옵션 B: 별도 API 유지 (현재 방식)
- **우선순위**: 중간
- **관련 파일**: `src/modules/members/members.service.ts:199`

---

## 📋 Phase 2에서 미룬 항목

### 프로그램 마일스톤 자동 생성
- **현재 상태**: `ProgramMilestone` 엔티티 생성 완료, 자동 생성 로직 미구현
- **미룬 항목**:
  - [ ] PT 세션 생성 시 마일스톤 자동 생성
  - [ ] 주차별 진행률 자동 계산
  - [ ] 마일스톤 달성 여부 자동 판정
- **우선순위**: 중간
- **관련 파일**: `src/entities/program-milestone.entity.ts`

### 진행률 자동 계산
- **현재 상태**: `Membership.currentProgress` 필드 존재, 자동 계산 미구현
- **미룬 항목**:
  - [ ] 측정값 입력 시 진행률 자동 계산
  - [ ] 감소 목표 vs 증가 목표 분기 처리
  - [ ] `riskStatus` 자동 판정 (GREEN/YELLOW/RED)
- **우선순위**: 높음
- **관련 파일**: `src/entities/membership.entity.ts`

---

## 📋 추후 구현 예정 API

### Strength Level 연동
- [ ] `GET /api/members/:id/workout-records/:recordId/strength-level` - 운동 기록의 Strength Level 조회
- [ ] `GET /api/members/:id/strength-progress` - 회원의 운동별 Strength Level 변화 추적
- **관련 문서**: `README.md:221-224`

### 평가 시스템 개선
- [ ] 유연성(FLEXIBILITY) 가중치 추가
- [ ] 표준화 함수를 통한 실제 점수 계산
- **관련 문서**: `DB구조/ABILITY_DB_STRUCTURE.md:150, 196`

---

## 📋 Phase 4 예정 (회원 상세/대시보드 API 확장)

### Goal Analyst API
- [ ] `GET /api/members/:id/goal-analyst` - Goal Analyst 데이터
- **협의 필요**: BODY/STRENGTH/CONDITIONING 3개 영역 정의

### 센터 대시보드 API
- [ ] `GET /api/insights/center-dashboard` - 센터 대시보드
- **협의 필요**: 회원 관리 리스트 범위

---

## 📋 Phase 5 예정 (커스터마이징)

### 가중치/등급 커스터마이징
- [ ] 트레이너별 가중치 커스터마이징 UI/API
- [ ] 평가 기준표 커스터마이징
- [ ] 등급 체계 커스터마이징
- **관련 문서**: `1차피드백.md:161, 303-315`

---

## 🔧 기술 부채

### 코드 품질
- [ ] 유연성 평가 가중치 데이터 추가 (`FlexibilityItemWeight` 테이블)
- [ ] 평가 점수 계산 로직 표준화

### 테스트
- [ ] 단위 테스트 추가
- [ ] E2E 테스트 추가

---

## 📝 협의 필요 사항

### Phase 4 진행 전 결정 필요
1. **3개 영역 카드 정의**: BODY/STRENGTH/CONDITIONING - 기존 6개 평가 영역과 매핑 방법
2. **티어 기준**: Elite/Average/Under 판정 기준 최종 결정

---

*마지막 업데이트: 2026-01-21*
