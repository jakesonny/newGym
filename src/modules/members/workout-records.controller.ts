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
	ApiQuery,
} from "@nestjs/swagger";
import { WorkoutRecordsService } from "./workout-records.service";
import { WorkoutRoutinesService } from "./workout-routines.service";
import { CreateWorkoutRecordDto } from "./dto/create-workout-record.dto";
import { UpdateWorkoutRecordDto } from "./dto/update-workout-record.dto";
import { WorkoutVolumeQueryDto } from "./dto/workout-volume-query.dto";
import { JwtAuthGuard } from "../../common/guards";
import { Role } from "../../common/enums";
import { ApiResponseHelper } from "../../common/utils/api-response";
import { ApiExceptions } from "../../common/exceptions";
import { MemberIdParam, AdminTrainerRoles } from "../../common/decorators";
import { parsePagination } from "../../common/utils/pagination-helper";

@ApiTags("workout-records")
@ApiBearerAuth("JWT-auth")
@Controller("api/members/:memberId/workout-records")
@UseGuards(JwtAuthGuard)
export class WorkoutRecordsController {
	constructor(
		private readonly workoutRecordsService: WorkoutRecordsService,
		private readonly workoutRoutinesService: WorkoutRoutinesService,
	) {}

	@Get("calendar")
	@MemberIdParam()
	@ApiOperation({
		summary: "운동 캘린더 조회",
		description: "지정된 기간의 운동 캘린더를 조회합니다.",
	})
	@ApiResponse({ status: 200, description: "운동 캘린더 조회 성공" })
	async getWorkoutCalendar(
		@Param("memberId") memberId: string,
		@Query("startDate") startDate: string,
		@Query("endDate") endDate: string,
	) {
		const calendar = await this.workoutRecordsService.getCalendar(memberId, startDate, endDate);
		return ApiResponseHelper.success(calendar, "운동 캘린더 조회 성공");
	}

	@Get("volume")
	@MemberIdParam()
	@ApiOperation({
		summary: "볼륨 조회 및 분석",
		description: "회원의 부위별 운동 볼륨을 주간/월간으로 조회하거나 분석합니다.",
	})
	@ApiQuery({ name: "type", required: false, enum: ["basic", "analysis"], description: "조회 타입: basic(기본), analysis(분석)" })
	@ApiResponse({ status: 200, description: "볼륨 조회 성공" })
	async getWorkoutVolume(
		@Param("memberId") memberId: string,
		@Query() query: WorkoutVolumeQueryDto,
		@Query("type") type?: "basic" | "analysis",
	) {
		if (type === "analysis") {
			// VolumePeriod를 'WEEKLY' | 'MONTHLY'로 변환
			const period = query.period === 'month' ? 'MONTHLY' : 'WEEKLY';
			const analysis = await this.workoutRecordsService.getVolumeAnalysis(
				memberId,
				period,
				undefined, // startDate는 서비스에서 자동 계산
				undefined, // endDate는 서비스에서 자동 계산
			);
			return ApiResponseHelper.success(analysis, "볼륨 분석 조회 성공");
		}
		const volume = await this.workoutRecordsService.getVolumeByBodyPart(memberId, query);
		return ApiResponseHelper.success(volume, "부위별 볼륨 조회 성공");
	}

	@Get("one-rep-max-trend")
	@MemberIdParam()
	@ApiOperation({
		summary: "1RM 추세 그래프 데이터 조회",
		description: "운동별 1RM 변화 추세 데이터를 조회합니다.",
	})
	@ApiResponse({ status: 200, description: "1RM 추세 데이터 조회 성공" })
	@ApiQuery({ name: "exerciseName", required: false, description: "운동명 (선택적)" })
	@ApiQuery({ name: "startDate", required: false, description: "시작 날짜 (YYYY-MM-DD)" })
	@ApiQuery({ name: "endDate", required: false, description: "종료 날짜 (YYYY-MM-DD)" })
	async getOneRepMaxTrend(
		@Param("memberId") memberId: string,
		@Query("exerciseName") exerciseName?: string,
		@Query("startDate") startDate?: string,
		@Query("endDate") endDate?: string,
	) {
		const result = await this.workoutRecordsService.getOneRepMaxTrend(
			memberId,
			exerciseName,
			startDate,
			endDate,
		);
		return ApiResponseHelper.success(result, "1RM 추세 데이터 조회 성공");
	}

	@Get("volume-trend")
	@MemberIdParam()
	@ApiOperation({
		summary: "볼륨 추세 그래프 데이터 조회",
		description: "날짜별 볼륨 추세 데이터를 조회합니다.",
	})
	@ApiResponse({ status: 200, description: "볼륨 추세 데이터 조회 성공" })
	@ApiQuery({ name: "startDate", required: false, description: "시작 날짜 (YYYY-MM-DD)" })
	@ApiQuery({ name: "endDate", required: false, description: "종료 날짜 (YYYY-MM-DD)" })
	@ApiQuery({ name: "bodyPart", required: false, description: "부위 필터 (선택적)" })
	async getVolumeTrend(
		@Param("memberId") memberId: string,
		@Query("startDate") startDate?: string,
		@Query("endDate") endDate?: string,
		@Query("bodyPart") bodyPart?: string,
	) {
		const result = await this.workoutRecordsService.getVolumeTrend(
			memberId,
			startDate,
			endDate,
			bodyPart,
		);
		return ApiResponseHelper.success(result, "볼륨 추세 데이터 조회 성공");
	}

	@Get("trends")
	@MemberIdParam()
	@ApiOperation({
		summary: "운동 기록 추세 데이터 조회",
		description: "1RM 추세 또는 볼륨 추세 데이터를 조회합니다.",
	})
	@ApiResponse({ status: 200, description: "추세 데이터 조회 성공" })
	@ApiQuery({ name: "type", required: true, enum: ["oneRm", "volume"], description: "추세 타입" })
	@ApiQuery({ name: "exerciseName", required: false, description: "운동명 (선택적)" })
	@ApiQuery({ name: "startDate", required: false, description: "시작 날짜 (YYYY-MM-DD)" })
	@ApiQuery({ name: "endDate", required: false, description: "종료 날짜 (YYYY-MM-DD)" })
	async getTrends(
		@Param("memberId") memberId: string,
		@Query("type") type: "oneRm" | "volume",
		@Query("exerciseName") exerciseName?: string,
		@Query("startDate") startDate?: string,
		@Query("endDate") endDate?: string,
	) {
		const result = await this.workoutRecordsService.getTrends(
			memberId,
			type,
			exerciseName,
			startDate,
			endDate,
		);
		return ApiResponseHelper.success(result, "추세 데이터 조회 성공");
	}

	@Get()
	@MemberIdParam()
	@ApiOperation({
		summary: "운동 기록 목록 조회",
		description: "회원의 운동 기록을 조회합니다. 페이지네이션 및 날짜 필터링 지원.",
	})
	@ApiResponse({ status: 200, description: "운동 기록 목록 조회 성공" })
	async getWorkoutRecords(
		@Param("memberId") memberId: string,
		@Query("page") page?: string,
		@Query("pageSize") pageSize?: string,
		@Query("startDate") startDate?: string,
		@Query("endDate") endDate?: string,
	) {
		const { page: pageNum, pageSize: pageSizeNum } = parsePagination(page, pageSize);
		const result = await this.workoutRecordsService.findAll(
			memberId,
			pageNum,
			pageSizeNum,
			startDate,
			endDate,
		);
		return ApiResponseHelper.success(result, "운동 기록 목록 조회 성공");
	}

	@Get(":recordId")
	@MemberIdParam()
	@ApiOperation({
		summary: "운동 기록 상세 조회",
		description: "특정 운동 기록의 상세 정보를 조회합니다.",
	})
	@ApiParam({ name: "recordId", description: "운동 기록 ID (UUID)" })
	@ApiResponse({ status: 200, description: "운동 기록 상세 조회 성공" })
	async getWorkoutRecord(
		@Param("memberId") memberId: string,
		@Param("recordId") recordId: string,
	) {
		const record = await this.workoutRecordsService.findOne(recordId, memberId);
		return ApiResponseHelper.success(record, "운동 기록 상세 조회 성공");
	}

	@Post()
	@HttpCode(HttpStatus.CREATED)
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "운동 기록 생성",
		description: "새로운 운동 기록을 생성합니다. 볼륨은 자동 계산됩니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiResponse({ status: 201, description: "운동 기록 생성 성공" })
	async createWorkoutRecord(
		@Param("memberId") memberId: string,
		@Body() createDto: CreateWorkoutRecordDto,
	) {
		const record = await this.workoutRecordsService.create(memberId, createDto);
		return ApiResponseHelper.success(record, "운동 기록 생성 성공");
	}

	@Put(":recordId")
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "운동 기록 수정",
		description: "기존 운동 기록을 수정합니다. 볼륨은 자동 재계산됩니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiParam({ name: "recordId", description: "운동 기록 ID (UUID)" })
	@ApiResponse({ status: 200, description: "운동 기록 수정 성공" })
	async updateWorkoutRecord(
		@Param("memberId") memberId: string,
		@Param("recordId") recordId: string,
		@Body() updateDto: UpdateWorkoutRecordDto,
	) {
		const record = await this.workoutRecordsService.update(recordId, memberId, updateDto);
		return ApiResponseHelper.success(record, "운동 기록 수정 성공");
	}

	@Delete(":recordId")
	@MemberIdParam()
	@AdminTrainerRoles()
	@ApiOperation({
		summary: "운동 기록 삭제",
		description: "운동 기록을 삭제합니다. (ADMIN, TRAINER 권한 필요)",
	})
	@ApiParam({ name: "recordId", description: "운동 기록 ID (UUID)" })
	@ApiResponse({ status: 200, description: "운동 기록 삭제 성공" })
	async deleteWorkoutRecord(
		@Param("memberId") memberId: string,
		@Param("recordId") recordId: string,
	) {
		await this.workoutRecordsService.remove(recordId, memberId);
		return ApiResponseHelper.success(null, "운동 기록 삭제 성공");
	}

	@Get("one-rep-max")
	@MemberIdParam()
	@ApiOperation({
		summary: "1RM 조회",
		description: "빅3 운동(벤치프레스, 스쿼트, 데드리프트)의 최신/최고 1RM과 히스토리를 조회합니다. 기록이 없으면 대체 운동을 자동 탐색합니다.",
	})
	@ApiQuery({ name: "type", required: false, enum: ["major", "estimate"], description: "조회 타입: major(주요 운동만), estimate(전체 추정값)" })
	@ApiResponse({ status: 200, description: "1RM 조회 성공" })
	async getOneRepMax(
		@Param("memberId") memberId: string,
		@Query("type") type?: "major" | "estimate",
	) {
		if (type === "major") {
			const result = await this.workoutRecordsService.getMajorExercisesOneRepMax(memberId);
			return ApiResponseHelper.success(result, "주요 운동 1RM 조회 성공");
		}
		const result = await this.workoutRecordsService.getOneRepMaxEstimate(memberId);
		return ApiResponseHelper.success(result, "1RM 추정 조회 성공");
	}

	@Get("strength-progress")
	@MemberIdParam()
	@ApiOperation({
		summary: "회원의 운동별 Strength Level 변화 추적",
		description: "회원의 운동별 Strength Level 변화를 조회합니다.",
	})
	@ApiResponse({ status: 200, description: "Strength Level 변화 추적 조회 성공" })
	@ApiQuery({ name: "exerciseName", required: false, description: "운동명 (선택적)" })
	async getStrengthProgress(
		@Param("memberId") memberId: string,
		@Query("exerciseName") exerciseName?: string,
	) {
		const progress = await this.workoutRecordsService.getStrengthProgress(memberId, exerciseName);
		return ApiResponseHelper.success(progress, "Strength Level 변화 추적 조회 성공");
	}

	@Get("suggest-weight")
	@MemberIdParam()
	@ApiOperation({
		summary: "운동별 무게 제안",
		description: "Strength Level 기반으로 운동별 권장 무게를 제안합니다.",
	})
	@ApiResponse({ status: 200, description: "무게 제안 조회 성공" })
	@ApiQuery({ name: "exerciseName", required: true, description: "운동명" })
	@ApiQuery({ name: "reps", required: true, description: "반복 횟수" })
	async suggestWeight(
		@Param("memberId") memberId: string,
		@Query("exerciseName") exerciseName: string,
		@Query("reps") reps: string,
	) {
		const repsNum = parseInt(reps, 10);
		if (isNaN(repsNum) || repsNum <= 0) {
			throw ApiExceptions.badRequest("유효한 반복 횟수를 입력해주세요.");
		}

		const result = await this.workoutRoutinesService.suggestWeightForExercise(
			memberId,
			exerciseName,
			repsNum,
		);
		return ApiResponseHelper.success(result, "무게 제안 조회 성공");
	}
}
