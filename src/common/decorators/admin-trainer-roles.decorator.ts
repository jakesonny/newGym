import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { JwtRolesGuard } from '../guards';
import { Roles } from '../../modules/auth/decorators/roles.decorator';
import { Role } from '../enums';

/**
 * ADMIN, TRAINER 권한이 필요한 엔드포인트를 위한 데코레이터
 * @UseGuards(JwtRolesGuard), @Roles(Role.ADMIN, Role.TRAINER), @ApiResponse(403)을 자동으로 추가
 */
export function AdminTrainerRoles() {
	return applyDecorators(
		UseGuards(JwtRolesGuard),
		Roles(Role.ADMIN, Role.TRAINER),
		ApiResponse({ status: 403, description: '권한 없음' }),
	);
}

/**
 * ADMIN 권한만 필요한 엔드포인트를 위한 데코레이터
 */
export function AdminOnly() {
	return applyDecorators(
		UseGuards(JwtRolesGuard),
		Roles(Role.ADMIN),
		ApiResponse({ status: 403, description: '권한 없음' }),
	);
}
