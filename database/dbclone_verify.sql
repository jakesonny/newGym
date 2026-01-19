-- ============================================
-- 데이터베이스 클론 검증 스크립트
-- DBeaver에서 실행하여 데이터가 제대로 들어갔는지 확인
-- ============================================

-- ============================================
-- 1. Exercises 테이블 확인
-- ============================================

-- 전체 운동 개수
SELECT '=== Exercises 테이블 ===' AS section;
SELECT COUNT(*) AS total_exercises FROM exercises;

-- 기본 3대 운동 확인
SELECT '=== 기본 3대 운동 확인 ===' AS section;
SELECT name, name_en, category, body_part 
FROM exercises 
WHERE name_en IN ('Bench Press - Powerlifting', 'Barbell Squat', 'Barbell Deadlift')
ORDER BY name_en;

-- Free Exercise DB 데이터 확인 (한글명이 NULL인 운동들)
SELECT '=== Free Exercise DB 데이터 확인 (한글명 NULL인 운동 개수) ===' AS section;
SELECT COUNT(*) AS exercises_with_null_name 
FROM exercises 
WHERE name IS NULL;

-- 카테고리별 운동 개수
SELECT '=== 카테고리별 운동 개수 ===' AS section;
SELECT category, COUNT(*) AS count 
FROM exercises 
GROUP BY category 
ORDER BY category;

-- ============================================
-- 2. Strength Standards 테이블 확인
-- ============================================

-- 전체 표준 데이터 개수
SELECT '=== Strength Standards 전체 개수 ===' AS section;
SELECT COUNT(*) AS total_standards FROM strength_standards;

-- 운동별 표준 데이터 개수
SELECT '=== 운동별 표준 데이터 개수 ===' AS section;
SELECT e.name_en, COUNT(ss.id) AS standards_count
FROM exercises e
LEFT JOIN strength_standards ss ON ss.exercise_id = e.id
WHERE e.name_en IN ('Bench Press - Powerlifting', 'Barbell Squat', 'Barbell Deadlift')
GROUP BY e.name_en
ORDER BY e.name_en;

-- 벤치프레스 표준 데이터 상세 확인
SELECT '=== 벤치프레스 표준 데이터 상세 ===' AS section;
SELECT 
    ss.standard_type,
    ss.gender,
    ss.level,
    COUNT(*) AS count,
    MIN(ss.bodyweight_min) AS min_bodyweight,
    MAX(ss.bodyweight_max) AS max_bodyweight,
    MIN(ss.age_min) AS min_age,
    MAX(ss.age_max) AS max_age
FROM strength_standards ss
JOIN exercises e ON ss.exercise_id = e.id
WHERE e.name_en = 'Bench Press - Powerlifting'
GROUP BY ss.standard_type, ss.gender, ss.level
ORDER BY ss.standard_type, ss.gender, ss.level;

-- 스쿼트 표준 데이터 상세 확인
SELECT '=== 스쿼트 표준 데이터 상세 ===' AS section;
SELECT 
    ss.standard_type,
    ss.gender,
    ss.level,
    COUNT(*) AS count,
    MIN(ss.bodyweight_min) AS min_bodyweight,
    MAX(ss.bodyweight_max) AS max_bodyweight,
    MIN(ss.age_min) AS min_age,
    MAX(ss.age_max) AS max_age
FROM strength_standards ss
JOIN exercises e ON ss.exercise_id = e.id
WHERE e.name_en = 'Barbell Squat'
GROUP BY ss.standard_type, ss.gender, ss.level
ORDER BY ss.standard_type, ss.gender, ss.level;

-- 데드리프트 표준 데이터 상세 확인
SELECT '=== 데드리프트 표준 데이터 상세 ===' AS section;
SELECT 
    ss.standard_type,
    ss.gender,
    ss.level,
    COUNT(*) AS count,
    MIN(ss.bodyweight_min) AS min_bodyweight,
    MAX(ss.bodyweight_max) AS max_bodyweight,
    MIN(ss.age_min) AS min_age,
    MAX(ss.age_max) AS max_age
FROM strength_standards ss
JOIN exercises e ON ss.exercise_id = e.id
WHERE e.name_en = 'Barbell Deadlift'
GROUP BY ss.standard_type, ss.gender, ss.level
ORDER BY ss.standard_type, ss.gender, ss.level;

-- ============================================
-- 3. 체중별 데이터 확인 (BODYWEIGHT)
-- ============================================

SELECT '=== 체중별 데이터 확인 (벤치프레스 남성) ===' AS section;
SELECT 
    ss.bodyweight_min,
    ss.bodyweight_max,
    ss.level,
    ss.weight_kg
FROM strength_standards ss
JOIN exercises e ON ss.exercise_id = e.id
WHERE e.name_en = 'Bench Press - Powerlifting'
  AND ss.standard_type = 'BODYWEIGHT'
  AND ss.gender = 'MALE'
ORDER BY ss.bodyweight_min, ss.level
LIMIT 10;

-- ============================================
-- 4. 나이별 데이터 확인 (AGE)
-- ============================================

SELECT '=== 나이별 데이터 확인 (벤치프레스 남성) ===' AS section;
SELECT 
    ss.age_min,
    ss.age_max,
    ss.level,
    ss.weight_kg,
    ss.bodyweight_min,
    ss.bodyweight_max
FROM strength_standards ss
JOIN exercises e ON ss.exercise_id = e.id
WHERE e.name_en = 'Bench Press - Powerlifting'
  AND ss.standard_type = 'AGE'
  AND ss.gender = 'MALE'
ORDER BY ss.age_min, ss.level
LIMIT 10;

-- ============================================
-- 5. 예상 데이터 개수 확인
-- ============================================

-- 벤치프레스: 체중별 (남성 5레벨 x 약 20체중구간 = 100개) + 나이별 (남성 5레벨 x 약 10나이구간 = 50개) + 여성 동일 = 약 300개
-- 스쿼트: 동일하게 약 300개
-- 데드리프트: 동일하게 약 300개
-- 총 약 900개 정도 예상

SELECT '=== 예상 데이터 개수 확인 ===' AS section;
SELECT 
    e.name_en,
    ss.standard_type,
    ss.gender,
    COUNT(*) AS actual_count
FROM strength_standards ss
JOIN exercises e ON ss.exercise_id = e.id
WHERE e.name_en IN ('Bench Press - Powerlifting', 'Barbell Squat', 'Barbell Deadlift')
GROUP BY e.name_en, ss.standard_type, ss.gender
ORDER BY e.name_en, ss.standard_type, ss.gender;

-- ============================================
-- 6. NULL 값 확인 (문제가 있는 데이터)
-- ============================================

SELECT '=== NULL 값 확인 (문제 데이터) ===' AS section;
SELECT 
    e.name_en,
    ss.standard_type,
    ss.gender,
    ss.level,
    ss.bodyweight_min,
    ss.bodyweight_max,
    ss.age_min,
    ss.age_max
FROM strength_standards ss
JOIN exercises e ON ss.exercise_id = e.id
WHERE (ss.bodyweight_min IS NULL AND ss.standard_type = 'BODYWEIGHT')
   OR (ss.bodyweight_max IS NULL AND ss.standard_type = 'BODYWEIGHT')
   OR (ss.age_min IS NULL AND ss.standard_type = 'AGE')
   OR (ss.age_max IS NULL AND ss.standard_type = 'AGE')
LIMIT 20;

-- ============================================
-- 7. 최종 요약
-- ============================================

SELECT '=== 최종 요약 ===' AS section;
SELECT 
    'Exercises' AS table_name,
    COUNT(*) AS record_count
FROM exercises
UNION ALL
SELECT 
    'Strength Standards' AS table_name,
    COUNT(*) AS record_count
FROM strength_standards
UNION ALL
SELECT 
    'Strength Standards (벤치프레스)' AS table_name,
    COUNT(*) AS record_count
FROM strength_standards ss
JOIN exercises e ON ss.exercise_id = e.id
WHERE e.name_en = 'Bench Press - Powerlifting'
UNION ALL
SELECT 
    'Strength Standards (스쿼트)' AS table_name,
    COUNT(*) AS record_count
FROM strength_standards ss
JOIN exercises e ON ss.exercise_id = e.id
WHERE e.name_en = 'Barbell Squat'
UNION ALL
SELECT 
    'Strength Standards (데드리프트)' AS table_name,
    COUNT(*) AS record_count
FROM strength_standards ss
JOIN exercises e ON ss.exercise_id = e.id
WHERE e.name_en = 'Barbell Deadlift';
