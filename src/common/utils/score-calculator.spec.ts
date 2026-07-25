/**
 * ScoreCalculator 단위 테스트
 * 6영역(근력·심폐·근지구력·유연성·체성분·안정성) 가중 평균 종합 점수 계산과
 * 부상으로 인한 평가 제외 로직을 검증한다. Repository는 Jest mock으로 대체한다.
 */
import { ScoreCalculator } from "./score-calculator";
import { Category } from "../enums";
import { AssessmentItem } from "../../entities/assessment-item.entity";
import { InjuryRestriction } from "../../entities/injury-restriction.entity";

const makeItem = (
  category: Category,
  score: number | null,
): Partial<AssessmentItem> => ({
  category,
  score: score ?? undefined,
});

describe("ScoreCalculator", () => {
  let assessmentItemRepository: { find: jest.Mock };
  let abilitySnapshotRepository: { create: jest.Mock; save: jest.Mock };
  let injuryQueryBuilder: {
    leftJoinAndSelect: jest.Mock;
    where: jest.Mock;
    andWhere: jest.Mock;
    getMany: jest.Mock;
  };
  let injuryRestrictionRepository: { createQueryBuilder: jest.Mock };
  let calculator: ScoreCalculator;

  beforeEach(() => {
    assessmentItemRepository = { find: jest.fn() };
    abilitySnapshotRepository = {
      create: jest.fn((data) => data),
      save: jest.fn((data) => Promise.resolve({ id: "snapshot-1", ...data })),
    };
    injuryQueryBuilder = {
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([] as InjuryRestriction[]),
    };
    injuryRestrictionRepository = {
      createQueryBuilder: jest.fn(() => injuryQueryBuilder),
    };

    calculator = new ScoreCalculator(
      assessmentItemRepository as any,
      abilitySnapshotRepository as any,
      injuryRestrictionRepository as any,
    );
  });

  it("평가 항목이 없으면 에러를 던진다", async () => {
    assessmentItemRepository.find.mockResolvedValue([]);
    await expect(
      calculator.calculateAssessmentScore("assessment-1", "member-1"),
    ).rejects.toThrow();
  });

  it("6영역 점수를 가중치(안정 20%, 심폐 20%, 근지구력 20%, 근력 15%, 체성분 15%, 유연성 10%)로 가중 평균한다", async () => {
    assessmentItemRepository.find.mockResolvedValue([
      makeItem(Category.STRENGTH, 60),
      makeItem(Category.CARDIO, 70),
      makeItem(Category.ENDURANCE, 50),
      makeItem(Category.FLEXIBILITY, 90),
      makeItem(Category.BODY, 40),
      makeItem(Category.STABILITY, 100),
    ]);

    const snapshot = await calculator.calculateAssessmentScore(
      "assessment-1",
      "member-1",
    );

    // 60*0.15 + 70*0.2 + 50*0.2 + 90*0.1 + 40*0.15 + 100*0.2 = 68
    expect(snapshot.totalScore).toBeCloseTo(68, 5);
    expect(snapshot.strengthScore).toBe(60);
    expect(snapshot.stabilityScore).toBe(100);
  });

  it("동일 카테고리 내 여러 항목은 평균을 낸 뒤 가중치를 적용한다", async () => {
    assessmentItemRepository.find.mockResolvedValue([
      makeItem(Category.STRENGTH, 40),
      makeItem(Category.STRENGTH, 80),
    ]);

    const snapshot = await calculator.calculateAssessmentScore(
      "assessment-1",
      "member-1",
    );

    expect(snapshot.strengthScore).toBe(60); // (40+80)/2
    expect(snapshot.totalScore).toBe(60); // 근력만 존재하므로 가중치 재정규화 후에도 60
  });

  it("점수가 없는(null) 항목은 평균 계산에서 제외한다", async () => {
    assessmentItemRepository.find.mockResolvedValue([
      makeItem(Category.STRENGTH, null),
      makeItem(Category.STRENGTH, 80),
    ]);

    const snapshot = await calculator.calculateAssessmentScore(
      "assessment-1",
      "member-1",
    );

    expect(snapshot.strengthScore).toBe(80);
  });

  it("측정되지 않은 카테고리는 종합 점수 계산(가중치 재정규화)에서 제외한다", async () => {
    // 근력(60)과 심폐(80)만 측정 -> weightedSum = 60*0.15 + 80*0.2 = 25, totalWeight = 0.35
    assessmentItemRepository.find.mockResolvedValue([
      makeItem(Category.STRENGTH, 60),
      makeItem(Category.CARDIO, 80),
    ]);

    const snapshot = await calculator.calculateAssessmentScore(
      "assessment-1",
      "member-1",
    );

    expect(snapshot.totalScore).toBeCloseTo(25 / 0.35, 5);
  });

  it("부상으로 회복 중/만성인 영역은 점수가 있어도 종합 점수 계산에서 제외한다", async () => {
    assessmentItemRepository.find.mockResolvedValue([
      makeItem(Category.STRENGTH, 60),
      makeItem(Category.CARDIO, 80),
    ]);
    injuryQueryBuilder.getMany.mockResolvedValue([
      { restrictedCategory: Category.STRENGTH } as InjuryRestriction,
    ]);

    const snapshot = await calculator.calculateAssessmentScore(
      "assessment-1",
      "member-1",
    );

    // 근력은 부상으로 제외되어 null, 심폐(80)만 반영 -> totalScore = 80
    expect(snapshot.strengthScore).toBeUndefined();
    expect(snapshot.totalScore).toBe(80);
  });

  it("유효 점수가 하나도 없으면 종합 점수는 0이다", async () => {
    assessmentItemRepository.find.mockResolvedValue([
      makeItem(Category.STRENGTH, null),
    ]);

    const snapshot = await calculator.calculateAssessmentScore(
      "assessment-1",
      "member-1",
    );

    expect(snapshot.totalScore).toBe(0);
  });
});
