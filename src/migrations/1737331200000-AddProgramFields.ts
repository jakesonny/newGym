import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProgramFields1737331200000 implements MigrationInterface {
	name = 'AddProgramFields1737331200000';

	public async up(queryRunner: QueryRunner): Promise<void> {
		// 1. GoalType enum 생성
		await queryRunner.query(`
			CREATE TYPE "goal_type_enum" AS ENUM (
				'WEIGHT_LOSS',
				'MUSCLE_GAIN',
				'STRENGTH_UP',
				'ENDURANCE',
				'BODY_FAT_LOSS',
				'CUSTOM'
			)
		`);

		// 2. RiskStatus enum 생성
		await queryRunner.query(`
			CREATE TYPE "risk_status_enum" AS ENUM (
				'GREEN',
				'YELLOW',
				'RED'
			)
		`);

		// 3. memberships 테이블에 프로그램 관련 컬럼 추가
		await queryRunner.query(`
			ALTER TABLE "memberships"
			ADD COLUMN "duration_weeks" integer,
			ADD COLUMN "main_goal_type" "goal_type_enum",
			ADD COLUMN "main_goal_label" varchar,
			ADD COLUMN "target_value" float,
			ADD COLUMN "target_unit" varchar,
			ADD COLUMN "start_value" float,
			ADD COLUMN "current_value" float,
			ADD COLUMN "current_progress" integer DEFAULT 0,
			ADD COLUMN "risk_status" "risk_status_enum" DEFAULT 'GREEN'
		`);

		// 4. memberships 테이블에 인덱스 추가
		await queryRunner.query(`
			CREATE INDEX "idx_memberships_risk_status" ON "memberships" ("risk_status")
		`);

		// 5. pt_sessions 테이블에 측정값 관련 컬럼 추가
		await queryRunner.query(`
			ALTER TABLE "pt_sessions"
			ADD COLUMN "membership_id" uuid,
			ADD COLUMN "measured_weight" float,
			ADD COLUMN "measured_muscle_mass" float,
			ADD COLUMN "measured_body_fat" float,
			ADD COLUMN "bench_press_1rm" float,
			ADD COLUMN "squat_1rm" float,
			ADD COLUMN "deadlift_1rm" float,
			ADD COLUMN "milestone_created" boolean DEFAULT false
		`);

		// 6. pt_sessions 테이블에 외래키 및 인덱스 추가
		await queryRunner.query(`
			ALTER TABLE "pt_sessions"
			ADD CONSTRAINT "fk_pt_sessions_membership"
			FOREIGN KEY ("membership_id") REFERENCES "memberships"("id")
			ON DELETE SET NULL
		`);

		await queryRunner.query(`
			CREATE INDEX "idx_pt_sessions_membership_id" ON "pt_sessions" ("membership_id")
		`);

		// 7. program_milestones 테이블 생성
		await queryRunner.query(`
			CREATE TABLE "program_milestones" (
				"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
				"membership_id" uuid NOT NULL,
				"pt_session_id" uuid,
				"week_number" integer NOT NULL,
				"target_date" date NOT NULL,
				"measured_weight" float,
				"measured_muscle_mass" float,
				"measured_body_fat" float,
				"measured_value" float,
				"progress_at_milestone" integer,
				"is_achieved" boolean DEFAULT false,
				"achieved_at" timestamp,
				"trainer_feedback" text,
				"created_at" timestamp DEFAULT now(),
				"updated_at" timestamp DEFAULT now(),
				CONSTRAINT "fk_program_milestones_membership"
					FOREIGN KEY ("membership_id") REFERENCES "memberships"("id")
					ON DELETE CASCADE,
				CONSTRAINT "fk_program_milestones_pt_session"
					FOREIGN KEY ("pt_session_id") REFERENCES "pt_sessions"("id")
					ON DELETE SET NULL
			)
		`);

		// 8. program_milestones 테이블에 인덱스 추가
		await queryRunner.query(`
			CREATE INDEX "idx_program_milestones_membership_id" ON "program_milestones" ("membership_id")
		`);

		await queryRunner.query(`
			CREATE INDEX "idx_program_milestones_week_number" ON "program_milestones" ("week_number")
		`);

		await queryRunner.query(`
			CREATE INDEX "idx_program_milestones_is_achieved" ON "program_milestones" ("is_achieved")
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// 1. program_milestones 테이블 삭제
		await queryRunner.query(`DROP TABLE IF EXISTS "program_milestones"`);

		// 2. pt_sessions 테이블에서 추가된 컬럼 삭제
		await queryRunner.query(`DROP INDEX IF EXISTS "idx_pt_sessions_membership_id"`);
		await queryRunner.query(`ALTER TABLE "pt_sessions" DROP CONSTRAINT IF EXISTS "fk_pt_sessions_membership"`);
		await queryRunner.query(`
			ALTER TABLE "pt_sessions"
			DROP COLUMN IF EXISTS "membership_id",
			DROP COLUMN IF EXISTS "measured_weight",
			DROP COLUMN IF EXISTS "measured_muscle_mass",
			DROP COLUMN IF EXISTS "measured_body_fat",
			DROP COLUMN IF EXISTS "bench_press_1rm",
			DROP COLUMN IF EXISTS "squat_1rm",
			DROP COLUMN IF EXISTS "deadlift_1rm",
			DROP COLUMN IF EXISTS "milestone_created"
		`);

		// 3. memberships 테이블에서 추가된 컬럼 삭제
		await queryRunner.query(`DROP INDEX IF EXISTS "idx_memberships_risk_status"`);
		await queryRunner.query(`
			ALTER TABLE "memberships"
			DROP COLUMN IF EXISTS "duration_weeks",
			DROP COLUMN IF EXISTS "main_goal_type",
			DROP COLUMN IF EXISTS "main_goal_label",
			DROP COLUMN IF EXISTS "target_value",
			DROP COLUMN IF EXISTS "target_unit",
			DROP COLUMN IF EXISTS "start_value",
			DROP COLUMN IF EXISTS "current_value",
			DROP COLUMN IF EXISTS "current_progress",
			DROP COLUMN IF EXISTS "risk_status"
		`);

		// 4. enum 타입 삭제
		await queryRunner.query(`DROP TYPE IF EXISTS "risk_status_enum"`);
		await queryRunner.query(`DROP TYPE IF EXISTS "goal_type_enum"`);
	}
}
