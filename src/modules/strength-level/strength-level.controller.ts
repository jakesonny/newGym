import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { StrengthLevelService } from './strength-level.service';
import { CalculateStrengthLevelDto } from './dto/calculate-strength-level.dto';
import { StrengthLevelResponse } from './dto/strength-level-response.dto';

/**
 * Strength Level 측정기 컨트롤러
 * 비로그인 사용 가능 (Public API)
 */
@ApiTags('Strength Level')
@Controller('api/strength-level')
export class StrengthLevelController {
	constructor(private readonly strengthLevelService: StrengthLevelService) {}

	/**
	 * 빅3 운동 Strength Level 계산
	 * 체중/나이/성별 기반으로 5단계 레벨별 기준 무게 조회
	 * 현재 무게 입력시 현재 레벨 판정
	 */
	@Post('calculate')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({
		summary: '빅3 Strength Level 계산',
		description: `
체중, 나이, 성별을 기반으로 빅3 운동(벤치프레스, 스쿼트, 데드리프트)의 
5단계 Strength Level 기준 무게를 조회합니다.

**레벨 단계:**
- BEGINNER (헬스 입문): 운동을 시작한 지 얼마 되지 않은 단계
- NOVICE (초보자): 기본 동작을 익히고 꾸준히 운동하는 단계
- INTERMEDIATE (중급자): 일반적인 피트니스 수준을 가진 사람들보다 강함
- ADVANCED (고수): 상당한 수준의 근력을 보유
- ELITE (신): 최상위 수준의 근력, 상위 5% 이내

**사용 방법:**
1. 운동 종류, 나이, 체중, 성별을 입력
2. (선택) 현재 1RM 무게를 입력하면 현재 레벨 판정
3. 각 레벨별 목표 무게와 현재 위치 확인

**비로그인 사용 가능** - 로그인 없이도 측정 가능합니다.
		`,
	})
	@ApiResponse({
		status: 200,
		description: 'Strength Level 계산 성공',
		type: StrengthLevelResponse,
	})
	@ApiResponse({
		status: 400,
		description: '잘못된 요청 (유효성 검사 실패)',
	})
	@ApiResponse({
		status: 404,
		description: '운동 정보를 찾을 수 없음',
	})
	async calculate(
		@Body() dto: CalculateStrengthLevelDto,
	): Promise<StrengthLevelResponse> {
		return this.strengthLevelService.calculate(dto);
	}
}
