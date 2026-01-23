import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	UseGuards,
	HttpCode,
	HttpStatus,
} from "@nestjs/common";
import {
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiBearerAuth,
	ApiParam,
} from "@nestjs/swagger";
import { PTSessionsService } from "./pt-sessions.service";
import { CreatePTSessionDto } from "./dto/create-pt-session.dto";
import { UpdatePTSessionDto } from "./dto/update-pt-session.dto";
import { JwtAuthGuard } from "../../common/guards";
import { ApiResponseHelper } from "../../common/utils/api-response";
import { MemberIdParam, AdminTrainerRoles } from "../../common/decorators";

@ApiTags("pt-sessions")
@ApiBearerAuth("JWT-auth")
@Controller("api/members/:memberId/pt-sessions")
@UseGuards(JwtAuthGuard)
export class PTSessionsController {
	constructor(private readonly ptSessionsService: PTSessionsService) {}

	@Get()
	@MemberIdParam()
	@ApiOperation({
		summary: "PT 세션 목록 조회",
		description: "회원의 모든 PT 세션을 조회합니다.",
	})
	@ApiResponse({ status: 200, description: "PT 세션 목록 조회 성공" })
	async getPTSessions(@Param("memberId") memberId: string) {
		const result = await this.ptSessionsService.findAll(memberId);
		return ApiResponseHelper.success(result, "PT 세션 목록 조회 성공");
	}

	@Get(":sessionId")
	@MemberIdParam()
	@ApiOperation({
		summary: "PT 세션 상세 조회",
		description: "특정 PT 세션의 상세 정보를 조회합니다.",
	})
	@ApiParam({ name: "sessionId", description: "PT 세션 ID (UUID)" })
	@ApiResponse({ status: 200, description: "PT 세션 상세 조회 성공" })
	async getPTSession(
		@Param("memberId") memberId: string,
		@Param("sessionId") sessionId: string,
	) {
		const session = await this.ptSessionsService.findOne(sessionId, memberId);
		return ApiResponseHelper.success(session, "PT 세션 상세 조회 성공");
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "PT 세션 생성",
		description: "새로운 PT 세션을 생성합니다. 세션 번호는 자동 계산되고, completedSessions가 자동 증가합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiResponse({ status: 201, description: "PT 세션 생성 성공" })
	async createPTSession(
		@Param("memberId") memberId: string,
		@Body() createDto: CreatePTSessionDto,
	) {
		const session = await this.ptSessionsService.create(memberId, createDto);
		return ApiResponseHelper.success(session, "PT 세션 생성 성공");
	}

	@Put(":sessionId")
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "PT 세션 수정",
		description: "기존 PT 세션을 수정합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiParam({ name: "sessionId", description: "PT 세션 ID (UUID)" })
	@ApiResponse({ status: 200, description: "PT 세션 수정 성공" })
	async updatePTSession(
		@Param("memberId") memberId: string,
		@Param("sessionId") sessionId: string,
		@Body() updateDto: UpdatePTSessionDto,
	) {
		const session = await this.ptSessionsService.update(sessionId, memberId, updateDto);
		return ApiResponseHelper.success(session, "PT 세션 수정 성공");
	}

	@Delete(":sessionId")
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "PT 세션 삭제",
		description: "PT 세션을 삭제합니다. completedSessions가 자동 감소합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiParam({ name: "sessionId", description: "PT 세션 ID (UUID)" })
	@ApiResponse({ status: 200, description: "PT 세션 삭제 성공" })
	async deletePTSession(
		@Param("memberId") memberId: string,
		@Param("sessionId") sessionId: string,
	) {
		await this.ptSessionsService.remove(sessionId, memberId);
		return ApiResponseHelper.success(null, "PT 세션 삭제 성공");
	}
}
