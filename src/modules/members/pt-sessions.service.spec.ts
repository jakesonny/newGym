/**
 * PTSessionsService 회귀 테스트.
 *
 * 데모 데이터 시딩 중 발견된 두 가지 버그를 재발 방지한다.
 * 1) updateMembershipTrend()가 "방금 저장된 세션의 측정값"을 이미 조회 결과
 *    (recentSessions)에 포함된 상태에서 다시 push하여 마지막 두 측정값이
 *    항상 동일해지고 shortTermDelta가 0으로 고정되던 버그 (RED 등급 도달 불가).
 * 2) ProgressCalculator가 반환하는 소수점 진행률을 int 컬럼(currentProgress)에
 *    그대로 저장하려다 DB 저장이 실패하던 버그.
 */
import { PTSessionsService } from "./pt-sessions.service";
import { Member } from "../../entities/member.entity";
import { Membership } from "../../entities/membership.entity";
import { PTSession } from "../../entities/pt-session.entity";
import { GoalType, RiskStatus } from "../../common/enums";
import { CreatePTSessionDto } from "./dto/create-pt-session.dto";

describe("PTSessionsService", () => {
  let service: PTSessionsService;
  let ptSessionRepository: { findOne: jest.Mock };
  let memberRepository: { findOne: jest.Mock };
  let membershipRepository: { findOne: jest.Mock };
  let managerMock: {
    findOne: jest.Mock;
    find: jest.Mock;
    create: jest.Mock;
    save: jest.Mock;
    update: jest.Mock;
  };
  let queryRunner: {
    connect: jest.Mock;
    startTransaction: jest.Mock;
    commitTransaction: jest.Mock;
    rollbackTransaction: jest.Mock;
    release: jest.Mock;
    manager: typeof managerMock;
  };
  let dataSource: { createQueryRunner: jest.Mock };

  const baseMember: Partial<Member> = {
    id: "member-1",
    totalSessions: 10,
    completedSessions: 2,
    goalProgress: 20,
  };

  const baseDto: CreatePTSessionDto = {
    sessionDate: "2026-07-20",
    mainContent: "하체 운동",
    membershipId: "membership-1",
  };

  beforeEach(() => {
    ptSessionRepository = { findOne: jest.fn().mockResolvedValue(null) };
    memberRepository = { findOne: jest.fn() };
    membershipRepository = { findOne: jest.fn() };

    managerMock = {
      findOne: jest.fn(),
      find: jest.fn().mockResolvedValue([]),
      create: jest.fn((_entity, data) => data),
      save: jest.fn((entity, data) =>
        Promise.resolve(
          entity === PTSession ? { id: "session-1", ...data } : data,
        ),
      ),
      update: jest.fn().mockResolvedValue(undefined),
    };

    queryRunner = {
      connect: jest.fn().mockResolvedValue(undefined),
      startTransaction: jest.fn().mockResolvedValue(undefined),
      commitTransaction: jest.fn().mockResolvedValue(undefined),
      rollbackTransaction: jest.fn().mockResolvedValue(undefined),
      release: jest.fn().mockResolvedValue(undefined),
      manager: managerMock,
    };

    dataSource = { createQueryRunner: jest.fn(() => queryRunner) };

    service = new PTSessionsService(
      ptSessionRepository as any,
      memberRepository as any,
      membershipRepository as any,
      dataSource as any,
    );
  });

  /** manager.findOne이 엔티티 타입에 따라 다른 픽스처를 반환하도록 설정 */
  function stubEntities(
    member: Partial<Member>,
    membership: Partial<Membership>,
  ) {
    managerMock.findOne.mockImplementation((entity: any) => {
      if (entity === Member) return Promise.resolve({ ...member });
      if (entity === Membership) return Promise.resolve({ ...membership });
      return Promise.resolve(null);
    });
  }

  it("세션 2회 기록 후 shortTermDelta가 0이 아닌 실제 변화량을 반영하고 지속 역행 시 RED로 판정한다 (회귀: 추세 중복 반영)", async () => {
    stubEntities(baseMember, {
      id: "membership-1",
      mainGoalType: GoalType.WEIGHT_LOSS,
      startValue: 80,
      targetValue: 70,
      currentProgress: 0,
    });

    // 방금 저장된 세션(75kg)은 이미 같은 트랜잭션 내에서 저장되었으므로
    // recentSessions 조회 결과에 포함되어 있어야 한다 (실제 DB 동작 재현).
    managerMock.find.mockResolvedValue([
      { measuredWeight: 70 },
      { measuredWeight: 72 },
      { measuredWeight: 75 },
    ]);

    await service.create("member-1", { ...baseDto, measuredWeight: 75 });

    const updateCall = managerMock.update.mock.calls.find(
      (call) => call[0] === Membership,
    );
    expect(updateCall).toBeDefined();
    const payload = updateCall[2];

    // 버그 발생 시: measurements = [70, 72, 75, 75] -> shortTermDelta = 0 -> YELLOW 고정
    // 수정 후: measurements = [70, 72, 75] -> shortTermDelta = 3 (역행) -> RED
    expect(payload.riskStatus).toBe(RiskStatus.RED);
  });

  it("소수점 진행률(예: 62.3%)이 계산되어도 currentProgress는 반올림된 정수로 저장되어 500 에러 없이 세션이 저장된다 (회귀: int 컬럼 저장 실패)", async () => {
    stubEntities(baseMember, {
      id: "membership-1",
      mainGoalType: GoalType.WEIGHT_LOSS,
      startValue: 100,
      targetValue: 0,
      currentProgress: 0,
    });

    managerMock.find.mockResolvedValue([{ measuredWeight: 37.7 }]);

    await expect(
      service.create("member-1", { ...baseDto, measuredWeight: 37.7 }),
    ).resolves.toBeDefined();

    const updateCall = managerMock.update.mock.calls.find(
      (call) => call[0] === Membership,
    );
    expect(updateCall).toBeDefined();
    const payload = updateCall[2];

    // (100 - 37.7) / 100 * 100 = 62.3% -> 반올림 후 62
    expect(payload.currentProgress).toBe(62);
    expect(Number.isInteger(payload.currentProgress)).toBe(true);
  });
});
