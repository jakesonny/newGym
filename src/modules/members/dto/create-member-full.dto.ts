import {
	IsString,
	IsEmail,
	IsDateString,
	IsOptional,
	IsEnum,
	MaxLength,
	IsNumber,
	Min,
	Max,
	ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MemberStatus, Gender, MembershipType, MembershipStatus, GoalType } from '../../../common/enums';

/**
 * Step 1: 기본 정보 DTO
 */
export class MemberBasicInfoDto {
	@ApiProperty({ description: '회원 이름', example: '홍길동' })
	@IsString()
	@MaxLength(255)
	name: string;

	@ApiProperty({ description: '전화번호', example: '010-1234-5678' })
	@IsString()
	@MaxLength(50)
	phone: string;

	@ApiProperty({ description: '이메일', example: 'member@example.com', required: false })
	@IsOptional()
	@IsEmail()
	@MaxLength(255)
	email?: string;

	@ApiProperty({ description: '가입일', example: '2024-01-01' })
	@IsDateString()
	joinDate: string;

	@ApiPropertyOptional({ description: '생년월일', example: '1990-01-15' })
	@IsOptional()
	@IsDateString()
	birthDate?: string;

	@ApiPropertyOptional({ enum: Gender, description: '성별' })
	@IsOptional()
	@IsEnum(Gender)
	gender?: Gender;

	@ApiPropertyOptional({ description: '키 (cm)', example: 175 })
	@IsOptional()
	@IsNumber()
	@Min(50)
	@Max(250)
	height?: number;

	@ApiPropertyOptional({ description: '몸무게 (kg)', example: 70 })
	@IsOptional()
	@IsNumber()
	@Min(20)
	@Max(300)
	weight?: number;

	@ApiPropertyOptional({ enum: MemberStatus, default: MemberStatus.ACTIVE })
	@IsOptional()
	@IsEnum(MemberStatus)
	status?: MemberStatus;
}

/**
 * Step 2: 회원권 + 프로그램 정보 DTO
 */
export class MembershipProgramDto {
	@ApiProperty({ enum: MembershipType, description: '회원권 타입' })
	@IsEnum(MembershipType)
	membershipType: MembershipType;

	@ApiProperty({ description: '구매일', example: '2024-01-01' })
	@IsDateString()
	purchaseDate: string;

	@ApiProperty({ description: '만료일', example: '2024-12-31' })
	@IsDateString()
	expiryDate: string;

	@ApiPropertyOptional({ enum: MembershipStatus, default: MembershipStatus.ACTIVE })
	@IsOptional()
	@IsEnum(MembershipStatus)
	status?: MembershipStatus;

	@ApiProperty({ description: '가격', example: 500000 })
	@IsNumber()
	@Min(0)
	price: number;

	// 프로그램 정보
	@ApiPropertyOptional({ description: '프로그램 기간 (주)', enum: [4, 8, 12] })
	@IsOptional()
	@IsNumber()
	durationWeeks?: number;

	@ApiPropertyOptional({ enum: GoalType, description: '메인 목표 유형' })
	@IsOptional()
	@IsEnum(GoalType)
	mainGoalType?: GoalType;

	@ApiPropertyOptional({ description: '메인 목표 라벨', example: '체중 감량' })
	@IsOptional()
	@IsString()
	mainGoalLabel?: string;

	@ApiPropertyOptional({ description: '목표 수치', example: 10 })
	@IsOptional()
	@IsNumber()
	targetValue?: number;

	@ApiPropertyOptional({ description: '목표 단위', example: 'kg' })
	@IsOptional()
	@IsString()
	targetUnit?: string;

	@ApiPropertyOptional({ description: '시작 수치', example: 85 })
	@IsOptional()
	@IsNumber()
	startValue?: number;

	// PT 횟수
	@ApiPropertyOptional({ description: 'PT 총 횟수', example: 20 })
	@IsOptional()
	@IsNumber()
	@Min(0)
	ptTotalCount?: number;
}

/**
 * Step 3: 초기 측정값 DTO
 */
export class InitialMeasurementDto {
	@ApiPropertyOptional({ description: '체중 (kg)', example: 75.5 })
	@IsOptional()
	@IsNumber()
	@Min(20)
	@Max(300)
	weight?: number;

	@ApiPropertyOptional({ description: '골격근량 (kg)', example: 32.5 })
	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(100)
	muscleMass?: number;

	@ApiPropertyOptional({ description: '체지방률 (%)', example: 18.5 })
	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(100)
	bodyFat?: number;

	@ApiPropertyOptional({ description: '벤치프레스 1RM (kg)', example: 80 })
	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(500)
	benchPress1RM?: number;

	@ApiPropertyOptional({ description: '스쿼트 1RM (kg)', example: 100 })
	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(500)
	squat1RM?: number;

	@ApiPropertyOptional({ description: '데드리프트 1RM (kg)', example: 120 })
	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(500)
	deadlift1RM?: number;
}

/**
 * 회원 등록 전체 DTO (3단계 위저드 통합)
 * 
 * Step 1: 기본 정보 (필수)
 * Step 2: 회원권 + 프로그램 (선택)
 * Step 3: 초기 측정값 (선택)
 */
export class CreateMemberFullDto {
	// ========== Step 1: 기본 정보 (필수) ==========
	@ApiProperty({ description: '회원 이름', example: '홍길동' })
	@IsString()
	@MaxLength(255)
	name: string;

	@ApiProperty({ description: '전화번호', example: '010-1234-5678' })
	@IsString()
	@MaxLength(50)
	phone: string;

	@ApiProperty({ description: '이메일', example: 'member@example.com', required: false })
	@IsOptional()
	@IsEmail()
	@MaxLength(255)
	email?: string;

	@ApiProperty({ description: '가입일', example: '2024-01-01' })
	@IsDateString()
	joinDate: string;

	@ApiPropertyOptional({ description: '생년월일', example: '1990-01-15' })
	@IsOptional()
	@IsDateString()
	birthDate?: string;

	@ApiPropertyOptional({ enum: Gender, description: '성별' })
	@IsOptional()
	@IsEnum(Gender)
	gender?: Gender;

	@ApiPropertyOptional({ description: '키 (cm)', example: 175 })
	@IsOptional()
	@IsNumber()
	@Min(50)
	@Max(250)
	height?: number;

	@ApiPropertyOptional({ description: '몸무게 (kg)', example: 70 })
	@IsOptional()
	@IsNumber()
	@Min(20)
	@Max(300)
	weight?: number;

	@ApiPropertyOptional({ enum: MemberStatus, default: MemberStatus.ACTIVE })
	@IsOptional()
	@IsEnum(MemberStatus)
	status?: MemberStatus;

	// ========== Step 2: 회원권 + 프로그램 (선택) ==========
	@ApiPropertyOptional({ type: MembershipProgramDto, description: '회원권 및 프로그램 정보' })
	@IsOptional()
	@ValidateNested()
	@Type(() => MembershipProgramDto)
	membership?: MembershipProgramDto;

	// ========== Step 3: 초기 측정값 (선택) ==========
	@ApiPropertyOptional({ type: InitialMeasurementDto, description: '초기 측정값' })
	@IsOptional()
	@ValidateNested()
	@Type(() => InitialMeasurementDto)
	initialMeasurement?: InitialMeasurementDto;
}
