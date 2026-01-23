import { applyDecorators } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

/**
 * 회원 ID 파라미터 데코레이터
 * @ApiParam({ name: 'memberId', description: '회원 ID (UUID)' })를 자동으로 추가
 */
export function MemberIdParam() {
	return applyDecorators(
		ApiParam({ name: 'memberId', description: '회원 ID (UUID)', type: 'string' }),
	);
}
