/**
 * InsightsService 회귀 테스트.
 *
 * 라이브 환경에서 회원이 0명일 때 센터 대시보드(getCenterDashboard)가
 * TypeORM 쿼리빌더의 `IN (:...memberIds)`에 빈 배열을 그대로 바인딩하면서
 * "syntax error at or near \")\"" 로 500 에러가 발생했던 버그를 재발 방지한다.
 */
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { InsightsService } from "./insights.service";
import { AbilitySnapshot } from "../../entities/ability-snapshot.entity";
import { Member } from "../../entities/member.entity";
import { Assessment } from "../../entities/assessment.entity";
import { InjuryHistory } from "../../entities/injury-history.entity";
import { Membership } from "../../entities/membership.entity";

// 테스트에서 실제 사용하는 메서드만 최소한으로 목킹한다.
const createRepositoryMock = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  createQueryBuilder: jest.fn(),
});

describe("InsightsService", () => {
  let service: InsightsService;
  let memberRepository: ReturnType<typeof createRepositoryMock>;
  let membershipRepository: ReturnType<typeof createRepositoryMock>;
  let assessmentRepository: ReturnType<typeof createRepositoryMock>;

  beforeEach(async () => {
    memberRepository = createRepositoryMock();
    membershipRepository = createRepositoryMock();
    assessmentRepository = createRepositoryMock();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InsightsService,
        {
          provide: getRepositoryToken(AbilitySnapshot),
          useValue: createRepositoryMock(),
        },
        { provide: getRepositoryToken(Member), useValue: memberRepository },
        {
          provide: getRepositoryToken(Assessment),
          useValue: assessmentRepository,
        },
        {
          provide: getRepositoryToken(InjuryHistory),
          useValue: createRepositoryMock(),
        },
        {
          provide: getRepositoryToken(Membership),
          useValue: membershipRepository,
        },
      ],
    }).compile();

    service = module.get(InsightsService);
  });

  describe("getCenterDashboard", () => {
    it("회원이 0명이면 IN (:...memberIds) 쿼리를 건너뛰고 빈 요약을 반환한다", async () => {
      memberRepository.find.mockResolvedValue([]);

      const result = await service.getCenterDashboard();

      expect(result).toEqual({
        summary: {
          totalMembers: 0,
          activeMembers: 0,
          averageProgress: 0,
          riskCounts: { foundation: 0, green: 0, yellow: 0, red: 0 },
          missingMeasurements: 0,
        },
        memberList: [],
      });
      // 회원이 없으면 IN 절 쿼리 자체가 실행되지 않아야 한다(빈 배열 IN 은 SQL 문법 오류).
      expect(membershipRepository.find).not.toHaveBeenCalled();
      expect(assessmentRepository.createQueryBuilder).not.toHaveBeenCalled();
    });
  });
});
