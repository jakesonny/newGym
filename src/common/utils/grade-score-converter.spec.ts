/**
 * GradeScoreConverter 단위 테스트
 * 트레이너가 입력하는 등급(A/B/C/D 등)을 내부 점수(0-100)로 변환하는 도메인 규칙을 검증한다.
 * 점수계산표 기준: 하체 근력/심폐/근지구력/안정성은 고정 매핑표, 유연성/체성분은 DB 기준 데이터를 사용한다.
 */
import { GradeScoreConverter } from "./grade-score-converter";
import { Category } from "../enums";

describe("GradeScoreConverter", () => {
  let flexibilityWeightRepository: { find: jest.Mock };
  let flexibilityThresholdRepository: { find: jest.Mock };
  let bodyCompositionStandardRepository: { find: jest.Mock };
  let converter: GradeScoreConverter;

  beforeEach(() => {
    flexibilityWeightRepository = { find: jest.fn().mockResolvedValue([]) };
    flexibilityThresholdRepository = { find: jest.fn().mockResolvedValue([]) };
    bodyCompositionStandardRepository = {
      find: jest.fn().mockResolvedValue([]),
    };

    converter = new GradeScoreConverter(
      {} as any,
      flexibilityWeightRepository as any,
      flexibilityThresholdRepository as any,
      bodyCompositionStandardRepository as any,
    );
  });

  describe("하체 근력 (STRENGTH)", () => {
    it.each([
      ["A", 80],
      ["B", 60],
      ["C", 45],
      ["D-1", 30],
      ["D-2", 20],
    ])("등급 %s는 %i점으로 변환된다", async (grade, expected) => {
      const score = await converter.convertGradeToScore(Category.STRENGTH, {
        grade,
      });
      expect(score).toBe(expected);
    });

    it("알 수 없는 등급이나 grade 누락 시 null을 반환한다", async () => {
      expect(
        await converter.convertGradeToScore(Category.STRENGTH, { grade: "Z" }),
      ).toBeNull();
      expect(
        await converter.convertGradeToScore(Category.STRENGTH, {}),
      ).toBeNull();
    });
  });

  describe("심폐 지구력 (CARDIO)", () => {
    it.each([
      ["A", undefined, 80],
      ["B", ["fast"], 65],
      ["B", ["slow"], 55],
      ["B", undefined, 60],
      ["C", undefined, 40],
      ["IMPOSSIBLE", undefined, 20],
    ])(
      "등급 %s (회복속도: %s)는 %i점으로 변환된다",
      async (grade, recoverySpeed, expected) => {
        const score = await converter.convertGradeToScore(Category.CARDIO, {
          grade,
          recoverySpeed,
        });
        expect(score).toBe(expected);
      },
    );
  });

  describe("근지구력 (ENDURANCE)", () => {
    it.each([
      ["A", 80],
      ["B", 60],
      ["C", 40],
      ["IMPOSSIBLE", 20],
    ])("등급 %s는 %i점으로 변환된다", async (grade, expected) => {
      expect(
        await converter.convertGradeToScore(Category.ENDURANCE, { grade }),
      ).toBe(expected);
    });
  });

  describe("안정성 (STABILITY) - OHSA 등급 x 통증 여부 조합", () => {
    it.each([
      ["A", "none", 80],
      ["B", "none", 60],
      ["C", "none", 40],
      ["A", "present", 50],
      ["B", "present", 45],
      ["C", "present", 20],
    ])(
      "OHSA %s + 통증 %s 조합은 %i점으로 변환된다",
      async (ohsa, pain, expected) => {
        const score = await converter.convertGradeToScore(Category.STABILITY, {
          ohsa: ohsa as any,
          pain: pain as any,
        });
        expect(score).toBe(expected);
      },
    );

    it("ohsa 또는 pain 정보가 없으면 null을 반환한다", async () => {
      expect(
        await converter.convertGradeToScore(Category.STABILITY, {
          pain: "none",
        }),
      ).toBeNull();
      expect(
        await converter.convertGradeToScore(Category.STABILITY, { ohsa: "A" }),
      ).toBeNull();
    });
  });

  describe("유연성 (FLEXIBILITY)", () => {
    it("C 등급 항목이 없으면 가중치 합이 0이므로 기본값 80점을 반환한다", async () => {
      flexibilityWeightRepository.find.mockResolvedValue([
        { itemName: "sitAndReach", weight: 1.3, isActive: true },
      ]);
      const score = await converter.convertGradeToScore(Category.FLEXIBILITY, {
        flexibilityItems: { sitAndReach: "A", shoulder: "B" },
      });
      expect(score).toBe(80);
    });

    it("C 등급 항목의 가중치 합에 해당하는 판정 기준의 내부 점수를 반환한다", async () => {
      flexibilityWeightRepository.find.mockResolvedValue([
        { itemName: "sitAndReach", weight: 1.3, isActive: true },
        { itemName: "hip", weight: 1.2, isActive: true },
      ]);
      flexibilityThresholdRepository.find.mockResolvedValue([
        { weightSumMin: 0, weightSumMax: 0, internalScore: 80, isActive: true },
        {
          weightSumMin: 0.01,
          weightSumMax: 1.5,
          internalScore: 60,
          isActive: true,
        },
        {
          weightSumMin: 1.51,
          weightSumMax: 5,
          internalScore: 40,
          isActive: true,
        },
      ]);

      // sitAndReach가 C 등급 -> 가중치 합 1.3 -> 두 번째 구간(60점)
      const score = await converter.convertGradeToScore(Category.FLEXIBILITY, {
        flexibilityItems: { sitAndReach: "C", shoulder: "A" },
      });
      expect(score).toBe(60);
    });

    it("가중치 데이터가 없으면 null을 반환한다", async () => {
      const score = await converter.convertGradeToScore(Category.FLEXIBILITY, {
        flexibilityItems: { sitAndReach: "C" },
      });
      expect(score).toBeNull();
    });

    it("flexibilityItems가 없으면 null을 반환한다", async () => {
      expect(
        await converter.convertGradeToScore(Category.FLEXIBILITY, {}),
      ).toBeNull();
    });
  });

  describe("체성분 (BODY)", () => {
    const standard = {
      gender: "MALE",
      ageMin: 20,
      ageMax: 39,
      bodyFatPercentageMin: 10,
      bodyFatPercentageMax: 20,
      muscleMassPercentageMin: 40,
      isActive: true,
    };

    it("필수 입력값이 없으면 DB 조회 없이 null을 반환한다", async () => {
      const score = await converter.convertGradeToScore(Category.BODY, {
        bodyFatPercentage: 15,
      });
      expect(score).toBeNull();
      expect(bodyCompositionStandardRepository.find).not.toHaveBeenCalled();
    });

    it("체지방률 정상 + 골격근량 충분이면 80점 (근육 충분 + 지방 적정)", async () => {
      bodyCompositionStandardRepository.find.mockResolvedValue([standard]);
      const score = await converter.convertGradeToScore(Category.BODY, {
        bodyFatPercentage: 15,
        muscleMass: 45,
        age: 30,
        gender: "MALE",
      });
      expect(score).toBe(80);
    });

    it("둘 중 하나만 정상이면 60점 (한 요소 관리 필요)", async () => {
      bodyCompositionStandardRepository.find.mockResolvedValue([standard]);
      const score = await converter.convertGradeToScore(Category.BODY, {
        bodyFatPercentage: 15, // 정상
        muscleMass: 30, // 부족
        age: 30,
        gender: "MALE",
      });
      expect(score).toBe(60);
    });

    it("체지방 과다 또는 근육 부족이면 40점", async () => {
      bodyCompositionStandardRepository.find.mockResolvedValue([standard]);
      const score = await converter.convertGradeToScore(Category.BODY, {
        bodyFatPercentage: 25, // 과다
        muscleMass: 30, // 부족 (but OR 조건이라 아래 else if로 판정)
        age: 30,
        gender: "MALE",
      });
      expect(score).toBe(40);
    });

    it("해당 연령대 기준 데이터가 없으면 null을 반환한다", async () => {
      bodyCompositionStandardRepository.find.mockResolvedValue([standard]);
      const score = await converter.convertGradeToScore(Category.BODY, {
        bodyFatPercentage: 15,
        muscleMass: 45,
        age: 70, // 기준 범위(20-39) 밖
        gender: "MALE",
      });
      expect(score).toBeNull();
    });

    it("체중이 주어지면 골격근량(kg)을 체중 대비 퍼센트로 환산해서 판정한다", async () => {
      bodyCompositionStandardRepository.find.mockResolvedValue([standard]);
      // muscleMass 30kg / bodyWeight 70kg = 42.8% (기준 40% 이상 충족)
      const score = await converter.convertGradeToScore(Category.BODY, {
        bodyFatPercentage: 15,
        muscleMass: 30,
        bodyWeight: 70,
        age: 30,
        gender: "MALE",
      });
      expect(score).toBe(80);
    });
  });
});
