import {
	Controller,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
	Query,
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
import { WorkoutRoutinesService } from "./workout-routines.service";
import { CreateWorkoutRoutineDto } from "./dto/create-workout-routine.dto";
import { UpdateWorkoutRoutineDto } from "./dto/update-workout-routine.dto";
import { JwtAuthGuard } from "../../common/guards";
import { ApiResponseHelper } from "../../common/utils/api-response";
import { MemberIdParam, AdminTrainerRoles } from "../../common/decorators";

@ApiTags("member-workout-routines")
@ApiBearerAuth("JWT-auth")
@Controller("api/members/:memberId/workout-routines")
@UseGuards(JwtAuthGuard)
export class MemberWorkoutRoutinesController {
	constructor(private readonly workoutRoutinesService: WorkoutRoutinesService) {}

	@Get("today")
	@MemberIdParam()
	@ApiOperation({
		summary: "오늘의 운동 루틴 조회",
		description: "회원의 오늘 날짜 운동 루틴을 조회합니다.",
	})
	@ApiResponse({ status: 200, description: "오늘의 운동 루틴 조회 성공" })
	@ApiResponse({ status: 404, description: "오늘의 운동 루틴이 없습니다" })
	async getTodayRoutine(@Param("memberId") memberId: string) {
		const routine = await this.workoutRoutinesService.findToday(memberId);
		if (!routine) {
			return ApiResponseHelper.success(null, "오늘의 운동 루틴이 없습니다.");
		}
		return ApiResponseHelper.success(routine, "오늘의 운동 루틴 조회 성공");
	}

	@Get()
	@MemberIdParam()
	@ApiOperation({
		summary: "운동 루틴 목록 조회",
		description: "회원의 모든 운동 루틴을 조회합니다. 날짜 범위 및 완료 여부로 필터링 가능합니다.",
	})
	@ApiResponse({ status: 200, description: "운동 루틴 목록 조회 성공" })
	async getWorkoutRoutines(
		@Param("memberId") memberId: string,
		@Query("startDate") startDate?: string,
		@Query("endDate") endDate?: string,
		@Query("isCompleted") isCompleted?: string,
	) {
		const isCompletedBool =
			isCompleted === "true" ? true : isCompleted === "false" ? false : undefined;
		const routines = await this.workoutRoutinesService.findAll(
			memberId,
			startDate,
			endDate,
			isCompletedBool,
		);
		return ApiResponseHelper.success({ routines, total: routines.length }, "운동 루틴 목록 조회 성공");
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "운동 루틴 생성",
		description: "새로운 운동 루틴을 생성합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiResponse({ status: 201, description: "운동 루틴 생성 성공" })
	async createWorkoutRoutine(
		@Param("memberId") memberId: string,
		@Body() createDto: CreateWorkoutRoutineDto,
	) {
		const routine = await this.workoutRoutinesService.create(memberId, createDto);
		return ApiResponseHelper.success(routine, "운동 루틴 생성 성공");
	}

	@Put(":routineId")
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "운동 루틴 수정",
		description: "기존 운동 루틴을 수정합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiParam({ name: "routineId", description: "운동 루틴 ID (UUID)" })
	@ApiResponse({ status: 200, description: "운동 루틴 수정 성공" })
	async updateWorkoutRoutine(
		@Param("memberId") memberId: string,
		@Param("routineId") routineId: string,
		@Body() updateDto: UpdateWorkoutRoutineDto,
	) {
		const routine = await this.workoutRoutinesService.update(routineId, memberId, updateDto);
		return ApiResponseHelper.success(routine, "운동 루틴 수정 성공");
	}

	@Put(":routineId/complete")
	@MemberIdParam()
	@ApiOperation({
		summary: "운동 루틴 완료 처리",
		description: "운동 루틴을 완료 처리합니다. 모든 인증된 사용자가 가능합니다.",
	})
	@ApiParam({ name: "routineId", description: "운동 루틴 ID (UUID)" })
	@ApiResponse({ status: 200, description: "운동 루틴 완료 처리 성공" })
	async completeWorkoutRoutine(
		@Param("memberId") memberId: string,
		@Param("routineId") routineId: string,
	) {
		const routine = await this.workoutRoutinesService.complete(routineId, memberId);
		return ApiResponseHelper.success(routine, "운동 루틴 완료 처리 성공");
	}

	@Delete(":routineId")
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "운동 루틴 삭제",
		description: "운동 루틴을 삭제합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiParam({ name: "routineId", description: "운동 루틴 ID (UUID)" })
	@ApiResponse({ status: 200, description: "운동 루틴 삭제 성공" })
	async deleteWorkoutRoutine(
		@Param("memberId") memberId: string,
		@Param("routineId") routineId: string,
	) {
		await this.workoutRoutinesService.remove(routineId, memberId);
		return ApiResponseHelper.success(null, "운동 루틴 삭제 성공");
	}
}
