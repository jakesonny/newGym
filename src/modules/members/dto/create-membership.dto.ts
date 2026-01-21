import { IsEnum, IsDateString, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MembershipType, MembershipStatus, GoalType } from '../../../common/enums';

/**
 * 프로그램 정보 DTO (회원권 생성 시 함께 사용)
 */
export class ProgramInfoDto {
	@ApiProperty({
		description: '프로그램 기간 (주)',
		example: 12,
		enum: [4, 8, 12],
	})
	@IsNumber()
	durationWeeks: number;

	@ApiProperty({
		enum: GoalType,
		description: '메인 목표 유형',
		example: GoalType.WEIGHT_LOSS,
	})
	@IsEnum(GoalType)
	mainGoalType: GoalType;

	@ApiPropertyOptional({
		description: '메인 목표 라벨 (미입력시 GoalType에서 자동 생성)',
		example: '체중 감량',
	})
	@IsOptional()
	@IsString()
	mainGoalLabel?: string;

	@ApiPropertyOptional({
		description: '목표 수치',
		example: 10,
	})
	@IsOptional()
	@IsNumber()
	targetValue?: number;

	@ApiPropertyOptional({
		description: '목표 단위',
		example: 'kg',
	})
	@IsOptional()
	@IsString()
	targetUnit?: string;

	@ApiPropertyOptional({
		description: '시작 수치 (현재 체중 등)',
		example: 85,
	})
	@IsOptional()
	@IsNumber()
	startValue?: number;
}

export class CreateMembershipDto {
	@ApiProperty({
		description: '회원권 타입',
		enum: MembershipType,
		example: MembershipType.MONTHLY,
	})
	@IsEnum(MembershipType, { message: '올바른 회원권 타입이 아닙니다.' })
	membershipType: MembershipType;

	@ApiProperty({
		description: '구매일 (YYYY-MM-DD 형식)',
		example: '2024-01-01',
	})
	@IsDateString({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' })
	purchaseDate: string;

	@ApiProperty({
		description: '만료일 (YYYY-MM-DD 형식)',
		example: '2024-12-31',
	})
	@IsDateString({}, { message: '올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)' })
	expiryDate: string;

	@ApiPropertyOptional({
		description: '회원권 상태',
		enum: MembershipStatus,
		example: MembershipStatus.ACTIVE,
		default: MembershipStatus.ACTIVE,
	})
	@IsOptional()
	@IsEnum(MembershipStatus, { message: '올바른 회원권 상태가 아닙니다.' })
	status?: MembershipStatus;

	@ApiProperty({
		description: '가격',
		example: 100000,
		minimum: 0,
	})
	@IsNumber({}, { message: '가격은 숫자여야 합니다.' })
	@Min(0, { message: '가격은 0 이상이어야 합니다.' })
	price: number;

	// ========== 프로그램 정보 (Phase 2 추가) ==========

	@ApiPropertyOptional({
		description: '프로그램 정보 (선택)',
		type: ProgramInfoDto,
	})
	@IsOptional()
	@ValidateNested()
	@Type(() => ProgramInfoDto)
	program?: ProgramInfoDto;
}

