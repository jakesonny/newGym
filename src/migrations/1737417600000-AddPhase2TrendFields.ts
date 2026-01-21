import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhase2TrendFields1737417600000 implements MigrationInterface {
	name = 'AddPhase2TrendFields1737417600000';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// 1. GoalDirection enum 생성
		await queryRunner.query(`
			CREATE TYPE "goal_direction_enum" AS ENUM (
				'INCREASE',
				'DECREASE'
			)
		`);

		// 2. BlockPurpose enum 생성
		await queryRunner.query(`
			CREATE TYPE "block_purpose_enum" AS ENUM (
				'ADAPTATION',
				'INTENSITY',
				'CONSOLIDATION'
			)
		`);

		// 3. GoalType enum에 MAINTENANCE 추가
		await queryRunner.query(`
			ALTER TYPE "goal_type_enum" ADD VALUE IF NOT EXISTS 'MAINTENANCE'
		`);

		// 4. RiskStatus enum에 FOUNDATION 추가
		await queryRunner.query(`
			ALTER TYPE "risk_status_enum" ADD VALUE IF NOT EXISTS 'FOUNDATION' BEFORE 'GREEN'
		`);

		// 5. memberships 테이블에 Phase 2 필드 추가
		await queryRunner.query(`
			ALTER TABLE "memberships"
			ADD COLUMN IF NOT EXISTS "goal_direction" "goal_direction_enum",
			ADD COLUMN IF NOT EXISTS "is_rapid_progress" boolean DEFAULT false,
			ADD COLUMN IF NOT EXISTS "is_measurement_overdue" boolean DEFAULT false,
			ADD COLUMN IF NOT EXISTS "last_measurement_at" timestamp
		`);

		// 6. memberships의 기존 데이터 기본값 업데이트 (FOUNDATION으로)
		await queryRunner.query(`
			UPDATE "memberships" 
			SET "risk_status" = 'FOUNDATION' 
			WHERE "risk_status" IS NULL OR "current_progress" = 0
		`);

		// 7. pt_sessions 테이블에 stepTestTime 추가
		await queryRunner.query(`
			ALTER TABLE "pt_sessions"
			ADD COLUMN IF NOT EXISTS "step_test_time" integer
		`);

		// 8. program_milestones 테이블에 블록 관련 필드 추가
		await queryRunner.query(`
			ALTER TABLE "program_milestones"
			ADD COLUMN IF NOT EXISTS "block_number" integer,
			ADD COLUMN IF NOT EXISTS "block_purpose" "block_purpose_enum",
			ADD COLUMN IF NOT EXISTS "block_start_week" integer,
			ADD COLUMN IF NOT EXISTS "block_end_week" integer
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// 1. program_milestones 테이블에서 블록 관련 필드 삭제
		await queryRunner.query(`
			ALTER TABLE "program_milestones"
			DROP COLUMN IF EXISTS "block_number",
			DROP COLUMN IF EXISTS "block_purpose",
			DROP COLUMN IF EXISTS "block_start_week",
			DROP COLUMN IF EXISTS "block_end_week"
		`);

		// 2. pt_sessions 테이블에서 stepTestTime 삭제
		await queryRunner.query(`
			ALTER TABLE "pt_sessions"
			DROP COLUMN IF EXISTS "step_test_time"
		`);

		// 3. memberships 테이블에서 Phase 2 필드 삭제
		await queryRunner.query(`
			ALTER TABLE "memberships"
			DROP COLUMN IF EXISTS "goal_direction",
			DROP COLUMN IF EXISTS "is_rapid_progress",
			DROP COLUMN IF EXISTS "is_measurement_overdue",
			DROP COLUMN IF EXISTS "last_measurement_at"
		`);

		// 참고: PostgreSQL에서 enum 값 삭제는 복잡하므로 생략
		// 4. enum 타입 삭제
		await queryRunner.query(`DROP TYPE IF EXISTS "block_purpose_enum"`);
		await queryRunner.query(`DROP TYPE IF EXISTS "goal_direction_enum"`);
	}
}
