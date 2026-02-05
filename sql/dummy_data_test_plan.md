# 더미 데이터 10개 삽입 후 테스트 플랜

> 더미 데이터를 삽입한 후 진행할 단계별 테스트 및 검증 플랜입니다.

## 📋 목차
1. [데이터 삽입 및 검증](#1-데이터-삽입-및-검증)
2. [데이터베이스 데이터 확인](#2-데이터베이스-데이터-확인)
3. [API 엔드포인트 테스트](#3-api-엔드포인트-테스트)
4. [프론트엔드 연동 테스트](#4-프론트엔드-연동-테스트)
5. [기능별 상세 테스트](#5-기능별-상세-테스트)
6. [이슈 확인 및 수정](#6-이슈-확인-및-수정)

---

## 1. 데이터 삽입 및 검증

### 1.1 SQL 실행
```sql
-- DBeaver 또는 psql에서 실행
\i gym-membership-backend/sql/insert_dummy_data_10.sql
```

또는 파일 내용을 직접 실행

### 1.2 데이터 검증 쿼리
SQL 파일 하단의 검증 쿼리가 자동 실행되어 다음 데이터가 생성되었는지 확인:

```sql
SELECT 
    (SELECT COUNT(*) FROM members WHERE name LIKE '더미회원%') as member_count,
    (SELECT COUNT(*) FROM users WHERE email LIKE 'dummy%@test.com') as user_count,
    (SELECT COUNT(*) FROM memberships WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as membership_count,
    (SELECT COUNT(*) FROM pt_usages WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as pt_usage_count,
    (SELECT COUNT(*) FROM assessments WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as assessment_count,
    (SELECT COUNT(*) FROM workout_records WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as workout_record_count,
    (SELECT COUNT(*) FROM pt_sessions WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%')) as pt_session_count,
    (SELECT COUNT(*) FROM program_milestones WHERE membership_id IN (SELECT id FROM memberships WHERE member_id IN (SELECT id FROM members WHERE name LIKE '더미회원%'))) as milestone_count;
```

**예상 결과:**
- member_count: 10
- user_count: 10
- membership_count: 10
- pt_usage_count: 6 (PT_PACKAGE 회원만)
- assessment_count: 약 15-20개
- workout_record_count: 약 50-100개
- pt_session_count: 약 18-30개 (PT 회원만)
- milestone_count: 72개 (PT 회원만, 12주 * 6명)

---

## 2. 데이터베이스 데이터 확인

### 2.1 회원 데이터 확인
```sql
-- 더미 회원 목록 확인
SELECT 
    m.id,
    m.name,
    m.phone,
    m.email,
    m.status,
    m.gender,
    m.age,
    m.height,
    m.weight,
    ms.membership_type,
    ms.status as membership_status
FROM members m
LEFT JOIN memberships ms ON m.id = ms.member_id
WHERE m.name LIKE '더미회원%'
ORDER BY m.name;
```

### 2.2 PT 회원 확인
```sql
-- PT_PACKAGE 회원 확인
SELECT 
    m.name,
    ms.membership_type,
    ms.duration_weeks,
    ms.main_goal_type,
    ms.current_progress,
    ms.risk_status,
    pt.total_count,
    pt.used_count,
    pt.remaining_count
FROM members m
JOIN memberships ms ON m.id = ms.member_id
LEFT JOIN pt_usages pt ON m.id = pt.member_id
WHERE ms.membership_type = 'PT_PACKAGE'
AND m.name LIKE '더미회원%';
```

### 2.3 평가 데이터 확인
```sql
-- 평가 데이터 확인
SELECT 
    m.name,
    a.assessment_type,
    a.evaluated_at,
    a.condition,
    COUNT(ai.id) as item_count
FROM members m
JOIN assessments a ON m.id = a.member_id
LEFT JOIN assessment_items ai ON a.id = ai.assessment_id
WHERE m.name LIKE '더미회원%'
GROUP BY m.name, a.id, a.assessment_type, a.evaluated_at, a.condition
ORDER BY m.name, a.evaluated_at;
```

### 2.4 운동 기록 확인
```sql
-- 운동 기록 통계
SELECT 
    m.name,
    COUNT(wr.id) as workout_count,
    SUM(wr.volume) as total_volume,
    AVG(wr.one_rep_max) as avg_1rm
FROM members m
JOIN workout_records wr ON m.id = wr.member_id
WHERE m.name LIKE '더미회원%'
GROUP BY m.name
ORDER BY workout_count DESC;
```

### 2.5 프로그램 마일스톤 확인
```sql
-- PT 회원의 마일스톤 확인
SELECT 
    m.name,
    pm.week_number,
    pm.block_number,
    pm.block_purpose,
    pm.is_achieved,
    pm.progress_at_milestone
FROM members m
JOIN memberships ms ON m.id = ms.member_id
JOIN program_milestones pm ON ms.id = pm.membership_id
WHERE ms.membership_type = 'PT_PACKAGE'
AND m.name LIKE '더미회원%'
ORDER BY m.name, pm.week_number;
```

---

## 3. API 엔드포인트 테스트

### 3.1 Swagger 접속
```
http://localhost:3001/api
```

### 3.2 인증 (필요시)
```bash
# 테스트 계정 생성 (개발 환경)
POST /api/auth/create-test-account

# 또는 로그인
POST /api/auth/login
{
  "email": "dummy1@test.com",
  "password": "password"
}
```

### 3.3 회원 목록 조회
```http
GET /api/members
Authorization: Bearer {token}
```

**확인 사항:**
- [ ] 10명의 더미 회원이 표시되는지
- [ ] 페이지네이션 동작 확인
- [ ] 필터링 기능 동작 확인

### 3.4 회원 상세 조회
```http
GET /api/members/{memberId}
Authorization: Bearer {token}
```

**확인 사항:**
- [ ] 회원 기본 정보 표시
- [ ] 회원권 정보 표시
- [ ] PT 회원의 경우 PTUsage 정보 표시

### 3.5 평가 목록 조회
```http
GET /api/members/{memberId}/assessments
Authorization: Bearer {token}
```

**확인 사항:**
- [ ] 평가 목록이 표시되는지
- [ ] 평가 타입(INITIAL/PERIODIC) 구분 확인
- [ ] 평가 항목(AssessmentItem) 포함 여부

### 3.6 능력치 조회
```http
GET /api/members/{memberId}/assessments/abilities/latest
Authorization: Bearer {token}
```

**확인 사항:**
- [ ] 최신 능력치 스냅샷 표시
- [ ] 6개 영역 점수 확인 (strength, cardio, endurance, flexibility, body, stability)

### 3.7 레이더 차트 데이터
```http
GET /api/members/{memberId}/abilities/hexagon
Authorization: Bearer {token}
```

**확인 사항:**
- [ ] 초기 vs 현재 비교 데이터 반환
- [ ] 6개 영역 점수 정상 표시

### 3.8 운동 기록 조회
```http
GET /api/members/{memberId}/workout-records
Authorization: Bearer {token}
```

**확인 사항:**
- [ ] 운동 기록 목록 표시
- [ ] 볼륨, 1RM 계산값 확인

### 3.9 PT 세션 조회 (PT 회원만)
```http
GET /api/members/{memberId}/pt-sessions
Authorization: Bearer {token}
```

**확인 사항:**
- [ ] PT 세션 목록 표시
- [ ] 측정값(weight, muscleMass, bodyFat 등) 확인
- [ ] 빅3 1RM 데이터 확인

### 3.10 프로그램 마일스톤 조회 (PT 회원만)
```http
GET /api/members/{memberId}/program-milestones
Authorization: Bearer {token}
```

**확인 사항:**
- [ ] 12주 마일스톤 목록 표시
- [ ] 블록 정보(block_number, block_purpose) 확인
- [ ] 달성 여부(is_achieved) 확인

---

## 4. 프론트엔드 연동 테스트

### 4.1 회원 목록 화면
**확인 사항:**
- [ ] 10명의 더미 회원이 목록에 표시되는지
- [ ] 회원 상태(ACTIVE/INACTIVE/SUSPENDED) 표시 확인
- [ ] 회원권 타입 표시 확인
- [ ] 검색 기능 동작 확인

### 4.2 회원 상세 화면
**확인 사항:**
- [ ] 회원 기본 정보 표시
- [ ] 회원권 정보 표시
- [ ] PT 회원의 경우 PTUsage 정보 표시
- [ ] 목표 진행률 표시

### 4.3 평가 화면
**확인 사항:**
- [ ] 평가 목록 표시
- [ ] 평가 상세 정보 표시
- [ ] 평가 항목 표시
- [ ] 레이더 차트 표시 (능력치)

### 4.4 운동 기록 화면
**확인 사항:**
- [ ] 운동 기록 목록 표시
- [ ] 운동별 통계 표시
- [ ] 그래프/차트 표시 (있는 경우)

### 4.5 PT 세션 화면 (PT 회원만)
**확인 사항:**
- [ ] PT 세션 목록 표시
- [ ] 세션별 측정값 표시
- [ ] 진행률 표시

### 4.6 프로그램 마일스톤 화면 (PT 회원만)
**확인 사항:**
- [ ] 12주 마일스톤 표시
- [ ] 블록별 구분 표시
- [ ] 달성 여부 표시

---

## 5. 기능별 상세 테스트

### 5.1 PT 회원 기능 테스트
**테스트 항목:**
- [ ] PT_PACKAGE 회원 6명 확인
- [ ] PTUsage 데이터 확인 (total_count, used_count, remaining_count)
- [ ] PT 세션 데이터 확인 (3-5개씩)
- [ ] 프로그램 마일스톤 확인 (12주 * 6명 = 72개)

### 5.2 일반 회원 기능 테스트
**테스트 항목:**
- [ ] 일반 회원권 회원 4명 확인 (MONTHLY, QUARTERLY, YEARLY)
- [ ] 일반 회원은 PTUsage 없음 확인
- [ ] 일반 회원은 PT 세션 없음 확인

### 5.3 평가 시스템 테스트
**테스트 항목:**
- [ ] Assessment 데이터 확인 (회원당 1-2개)
- [ ] AbilitySnapshot 데이터 확인
- [ ] AssessmentItem 데이터 확인 (카테고리별)
- [ ] 능력치 점수 계산 확인

### 5.4 운동 기록 테스트
**테스트 항목:**
- [ ] WorkoutRecord 데이터 확인 (회원당 5-10개)
- [ ] 볼륨 계산 확인 (weight × reps × sets)
- [ ] 1RM 계산 확인
- [ ] 상대 근력 계산 확인

### 5.5 목표 진행률 테스트
**테스트 항목:**
- [ ] GoalType별 분포 확인 (WEIGHT_LOSS, STRENGTH_UP, ENDURANCE, MAINTENANCE)
- [ ] current_progress 값 확인 (0-100)
- [ ] risk_status 확인 (GREEN/YELLOW/FOUNDATION/RED)
- [ ] 목표 수치(target_value, current_value) 확인

---

## 6. 이슈 확인 및 수정

### 6.1 데이터 이슈
**확인 사항:**
- [ ] NULL 값이 없는지 확인
- [ ] 외래키 관계 정상인지 확인
- [ ] enum 값 정상인지 확인

### 6.2 API 이슈
**확인 사항:**
- [ ] 404 오류 없는지 확인
- [ ] 500 오류 없는지 확인
- [ ] 응답 데이터 형식 정상인지 확인

### 6.3 프론트엔드 이슈
**확인 사항:**
- [ ] 데이터 표시 오류 없는지 확인
- [ ] 빈 화면 없는지 확인
- [ ] 로딩 상태 정상인지 확인

### 6.4 성능 이슈
**확인 사항:**
- [ ] API 응답 시간 확인
- [ ] 데이터베이스 쿼리 성능 확인
- [ ] 프론트엔드 렌더링 성능 확인

---

## 7. 다음 단계

더미 데이터 테스트 완료 후:

1. **Phase 2 미완료 항목 구현**
   - 진행률 자동 계산 로직
   - 프로그램 마일스톤 자동 생성

2. **Phase 3 미완료 항목 구현**
   - 초기 측정값 저장 확장

3. **API 개선**
   - 에러 처리 개선
   - 응답 형식 표준화

4. **프론트엔드 개선**
   - UI/UX 개선
   - 성능 최적화

---

## 📝 체크리스트

### 데이터 삽입
- [ ] SQL 실행 완료
- [ ] 데이터 검증 쿼리 실행
- [ ] 예상 개수와 일치 확인

### 데이터베이스 확인
- [ ] 회원 데이터 확인
- [ ] PT 회원 데이터 확인
- [ ] 평가 데이터 확인
- [ ] 운동 기록 확인
- [ ] 프로그램 마일스톤 확인

### API 테스트
- [ ] 회원 목록 API
- [ ] 회원 상세 API
- [ ] 평가 목록 API
- [ ] 능력치 API
- [ ] 운동 기록 API
- [ ] PT 세션 API
- [ ] 프로그램 마일스톤 API

### 프론트엔드 테스트
- [ ] 회원 목록 화면
- [ ] 회원 상세 화면
- [ ] 평가 화면
- [ ] 운동 기록 화면
- [ ] PT 세션 화면
- [ ] 프로그램 마일스톤 화면

### 이슈 해결
- [ ] 데이터 이슈 해결
- [ ] API 이슈 해결
- [ ] 프론트엔드 이슈 해결
- [ ] 성능 이슈 해결

---

**작성일**: 2026-01-27  
**목적**: 더미 데이터 삽입 후 체계적인 테스트 및 검증
