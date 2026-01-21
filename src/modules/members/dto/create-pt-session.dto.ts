import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDateString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreatePTSessionDto {
	@ApiProperty({
		description: '수업 날짜',
		example: '2024-03-15',
		type: String,
		format: 'date',
	})
	@IsDateString()
	sessionDate: string;

	@ApiProperty({
		description: '주요 수업 내용',
		example: '하체 근력 운동 - 스쿼트, 레그프레스, 런지',
	})
	@IsString()
	mainContent: string;

	@ApiProperty({
		description: '트레이너 코멘트',
		example: '자세가 많이 개선되었습니다!',
		required: false,
	})
	@IsOptional()
	@IsString()
	trainerComment?: string;

	// ========== Phase 2 추가: 측정값 및 프로그램 연동 ==========

	@ApiPropertyOptional({
		description: '연결할 회원권/프로그램 ID',
		example: 'uuid-membership-id',
	})
	@IsOptional()
	@IsUUID()
	membershipId?: string;

	@ApiPropertyOptional({
		description: '측정 체중 (kg)',
		example: 79.5,
	})
	@IsOptional()
	@IsNumber()
	measuredWeight?: number;

	@ApiPropertyOptional({
		description: '측정 골격근량 (kg)',
		example: 35.2,
	})
	@IsOptional()
	@IsNumber()
	measuredMuscleMass?: number;

	@ApiPropertyOptional({
		description: '측정 체지방률 (%)',
		example: 18.5,
	})
	@IsOptional()
	@IsNumber()
	measuredBodyFat?: number;

	@ApiPropertyOptional({
		description: '벤치프레스 1RM (kg)',
		example: 80,
	})
	@IsOptional()
	@IsNumber()
	benchPress1RM?: number;

	@ApiPropertyOptional({
		description: '스쿼트 1RM (kg)',
		example: 100,
	})
	@IsOptional()
	@IsNumber()
	squat1RM?: number;

	@ApiPropertyOptional({
		description: '데드리프트 1RM (kg)',
		example: 120,
	})
	@IsOptional()
	@IsNumber()
	deadlift1RM?: number;

	@ApiPropertyOptional({
		description: '마일스톤 자동 생성 여부 (기본: true)',
		example: true,
		default: true,
	})
	@IsOptional()
	createMilestone?: boolean;
}

