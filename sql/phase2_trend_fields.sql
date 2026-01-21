-- ============================================================
-- Phase 2: 프로그램 관리 + 추세 기반 판정 (통합 SQL)
-- 실행 대상: PostgreSQL
-- 작성일: 2026-01-21
-- 설명: 기존 테이블에 프로그램/추세 필드 추가
-- ============================================================

-- 0. uuid-ossp 확장 (uuid_generate_v4 사용을 위해)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PART 1: Enum 타입 생성
-- ============================================================

-- 1. GoalType enum (목표 유형)
DO $$ BEGIN
    CREATE TYPE goal_type_enum AS ENUM (
        'WEIGHT_LOSS',
        'MUSCLE_GAIN', 
        'STRENGTH_UP',
        'ENDURANCE',
        'BODY_FAT_LOSS',
        'MAINTENANCE',
        'CUSTOM'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 2. RiskStatus enum (위험 상태 - FOUNDATION 포함)
DO $$ BEGIN
    CREATE TYPE risk_status_enum AS ENUM (
        'FOUNDATION',
        'GREEN',
        'YELLOW',
        'RED'
    );
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 3. GoalDirection enum (목표 방향)
DO $$ BEGIN
    CREATE TYPE goal_direction_enum AS ENUM ('INCREASE', 'DECREASE');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 4. BlockPurpose enum (블록 목적)
DO $$ BEGIN
    CREATE TYPE block_purpose_enum AS ENUM ('ADAPTATION', 'INTENSITY', 'CONSOLIDATION');
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- PART 2: memberships 테이블 확장
-- ============================================================

-- 프로그램 기본 필드
ALTER TABLE memberships
    ADD COLUMN IF NOT EXISTS duration_weeks integer,
    ADD COLUMN IF NOT EXISTS main_goal_type goal_type_enum,
    ADD COLUMN IF NOT EXISTS main_goal_label varchar,
    ADD COLUMN IF NOT EXISTS target_value float,
    ADD COLUMN IF NOT EXISTS target_unit varchar,
    ADD COLUMN IF NOT EXISTS start_value float,
    ADD COLUMN IF NOT EXISTS current_value float,
    ADD COLUMN IF NOT EXISTS current_progress integer DEFAULT 0,
    ADD COLUMN IF NOT EXISTS risk_status risk_status_enum DEFAULT 'FOUNDATION';

-- Phase 2 추세 기반 필드
ALTER TABLE memberships
    ADD COLUMN IF NOT EXISTS goal_direction goal_direction_enum,
    ADD COLUMN IF NOT EXISTS is_rapid_progress boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS is_measurement_overdue boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS last_measurement_at timestamp;

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_memberships_risk_status ON memberships (risk_status);

-- ============================================================
-- PART 3: pt_sessions 테이블 확장
-- ============================================================

ALTER TABLE pt_sessions
    ADD COLUMN IF NOT EXISTS membership_id uuid,
    ADD COLUMN IF NOT EXISTS measured_weight float,
    ADD COLUMN IF NOT EXISTS measured_muscle_mass float,
    ADD COLUMN IF NOT EXISTS measured_body_fat float,
    ADD COLUMN IF NOT EXISTS bench_press_1rm float,
    ADD COLUMN IF NOT EXISTS squat_1rm float,
    ADD COLUMN IF NOT EXISTS deadlift_1rm float,
    ADD COLUMN IF NOT EXISTS milestone_created boolean DEFAULT false,
    ADD COLUMN IF NOT EXISTS step_test_time integer;

-- 외래키 추가 (이미 있으면 무시)
DO $$ BEGIN
    ALTER TABLE pt_sessions
    ADD CONSTRAINT fk_pt_sessions_membership
    FOREIGN KEY (membership_id) REFERENCES memberships(id)
    ON DELETE SET NULL;
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_pt_sessions_membership_id ON pt_sessions (membership_id);

-- ============================================================
-- PART 4: program_milestones 테이블 생성
-- ============================================================

CREATE TABLE IF NOT EXISTS program_milestones (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    membership_id uuid NOT NULL,
    pt_session_id uuid,
    week_number integer NOT NULL,
    target_date date NOT NULL,
    -- 블록 관련 필드
    block_number integer,
    block_purpose block_purpose_enum,
    block_start_week integer,
    block_end_week integer,
    -- 측정값
    measured_weight float,
    measured_muscle_mass float,
    measured_body_fat float,
    measured_value float,
    -- 진행 상태
    progress_at_milestone integer,
    is_achieved boolean DEFAULT false,
    achieved_at timestamp,
    -- 피드백
    trainer_feedback text,
    -- 타임스탬프
    created_at timestamp DEFAULT now(),
    updated_at timestamp DEFAULT now(),
    -- 외래키
    CONSTRAINT fk_program_milestones_membership
        FOREIGN KEY (membership_id) REFERENCES memberships(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_program_milestones_pt_session
        FOREIGN KEY (pt_session_id) REFERENCES pt_sessions(id)
        ON DELETE SET NULL
);

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_program_milestones_membership_id ON program_milestones (membership_id);
CREATE INDEX IF NOT EXISTS idx_program_milestones_week_number ON program_milestones (week_number);
CREATE INDEX IF NOT EXISTS idx_program_milestones_is_achieved ON program_milestones (is_achieved);

-- ============================================================
-- PART 5: 컬럼 코멘트
-- ============================================================

COMMENT ON COLUMN memberships.duration_weeks IS '프로그램 기간 (4, 8, 12주)';
COMMENT ON COLUMN memberships.main_goal_type IS '메인 목표 유형';
COMMENT ON COLUMN memberships.main_goal_label IS '메인 목표 라벨';
COMMENT ON COLUMN memberships.target_value IS '목표 수치';
COMMENT ON COLUMN memberships.target_unit IS '목표 단위 (kg, %)';
COMMENT ON COLUMN memberships.start_value IS '시작 수치';
COMMENT ON COLUMN memberships.current_value IS '현재 수치';
COMMENT ON COLUMN memberships.current_progress IS '현재 진행률 (0-100)';
COMMENT ON COLUMN memberships.risk_status IS '위험 상태 (FOUNDATION/GREEN/YELLOW/RED)';
COMMENT ON COLUMN memberships.goal_direction IS 'CUSTOM 목표용 방향 (INCREASE/DECREASE)';
COMMENT ON COLUMN memberships.is_rapid_progress IS '급변 플래그 (빠른 순방향 변화)';
COMMENT ON COLUMN memberships.is_measurement_overdue IS '측정 미실시 플래그 (2주 경과)';
COMMENT ON COLUMN memberships.last_measurement_at IS '마지막 측정 일시';

COMMENT ON COLUMN pt_sessions.membership_id IS '연결된 회원권/프로그램 ID';
COMMENT ON COLUMN pt_sessions.measured_weight IS '측정 체중 (kg)';
COMMENT ON COLUMN pt_sessions.measured_muscle_mass IS '측정 골격근량 (kg)';
COMMENT ON COLUMN pt_sessions.measured_body_fat IS '측정 체지방률 (%)';
COMMENT ON COLUMN pt_sessions.bench_press_1rm IS '벤치프레스 1RM (kg)';
COMMENT ON COLUMN pt_sessions.squat_1rm IS '스쿼트 1RM (kg)';
COMMENT ON COLUMN pt_sessions.deadlift_1rm IS '데드리프트 1RM (kg)';
COMMENT ON COLUMN pt_sessions.milestone_created IS '마일스톤 생성 여부';
COMMENT ON COLUMN pt_sessions.step_test_time IS '스텝테스트 시간 (초)';

COMMENT ON COLUMN program_milestones.week_number IS '주차 (1, 2, 3...)';
COMMENT ON COLUMN program_milestones.block_number IS '블록 번호 (1, 2, 3...)';
COMMENT ON COLUMN program_milestones.block_purpose IS '블록 목적 (ADAPTATION/INTENSITY/CONSOLIDATION)';
COMMENT ON COLUMN program_milestones.block_start_week IS '블록 시작 주차';
COMMENT ON COLUMN program_milestones.block_end_week IS '블록 종료 주차';

-- ============================================================
-- 완료 메시지
-- ============================================================
DO $$ BEGIN
    RAISE NOTICE 'Phase 2 스키마 업데이트 완료!';
END $$;
