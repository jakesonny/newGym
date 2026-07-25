/**
 * ProgressCalculator 단위 테스트
 * feedback.md에서 현업 검증을 요청한 "정체(FLAT)/급변(RAPID)" 임계값 판정 로직의 경계값을 집중 검증한다.
 */
import { ProgressCalculator } from "./progress-calculator";
import { GoalType, RiskStatus, BlockPurpose } from "../enums";

describe("ProgressCalculator", () => {
  describe("calculateProgress", () => {
    it("감소 목표(체중 감량)의 진행률을 계산한다", () => {
      // 80kg -> 75kg, 목표 70kg: (80-75)/(80-70)*100 = 50%
      const progress = ProgressCalculator.calculateProgress(
        GoalType.WEIGHT_LOSS,
        80,
        75,
        70,
      );
      expect(progress).toBe(50);
    });

    it("증가 목표(근력 상승)의 진행률을 계산한다", () => {
      // 50kg -> 60kg, 목표 100kg: (60-50)/(100-50)*100 = 20%
      const progress = ProgressCalculator.calculateProgress(
        GoalType.STRENGTH_UP,
        50,
        60,
        100,
      );
      expect(progress).toBe(20);
    });

    it("목표를 초과 달성해도 100%로 캡핑한다", () => {
      const progress = ProgressCalculator.calculateProgress(
        GoalType.STRENGTH_UP,
        50,
        120,
        100,
      );
      expect(progress).toBe(100);
    });

    it("역행(목표와 반대 방향 변화)이면 0%로 캡핑한다", () => {
      const progress = ProgressCalculator.calculateProgress(
        GoalType.WEIGHT_LOSS,
        80,
        85,
        70,
      );
      expect(progress).toBe(0);
    });

    it("시작값과 목표값이 같으면, 현재값이 목표와 같을 때만 100%", () => {
      expect(
        ProgressCalculator.calculateProgress(GoalType.MAINTENANCE, 70, 70, 70),
      ).toBe(100);
      expect(
        ProgressCalculator.calculateProgress(GoalType.MAINTENANCE, 70, 68, 70),
      ).toBe(0);
    });
  });

  describe("calculateRiskStatusByTrend", () => {
    it("측정이 2회 미만이면 FOUNDATION(기초 단계)으로 판정한다", () => {
      expect(
        ProgressCalculator.calculateRiskStatusByTrend(
          [80],
          GoalType.WEIGHT_LOSS,
        ).status,
      ).toBe(RiskStatus.FOUNDATION);
      expect(
        ProgressCalculator.calculateRiskStatusByTrend([], GoalType.WEIGHT_LOSS)
          .status,
      ).toBe(RiskStatus.FOUNDATION);
    });

    it("정체 임계값(±0.5kg) 이내 변화는 YELLOW로 판정한다 (체중 감량)", () => {
      // 80 -> 79.7 (변화량 0.3kg, 정체 임계값 0.5kg 이내)
      const result = ProgressCalculator.calculateRiskStatusByTrend(
        [80, 79.7],
        GoalType.WEIGHT_LOSS,
      );
      expect(result.status).toBe(RiskStatus.YELLOW);
    });

    it("정체 임계값과 정확히 일치하는 경계값도 YELLOW로 판정한다 (<=)", () => {
      // 80 -> 79.5 (변화량 정확히 0.5kg)
      const result = ProgressCalculator.calculateRiskStatusByTrend(
        [80, 79.5],
        GoalType.WEIGHT_LOSS,
      );
      expect(result.status).toBe(RiskStatus.YELLOW);
    });

    it("급변 임계값(1.5kg/주) 이상 감소하고 목표 방향과 일치하면 GREEN + rapid_progress 플래그", () => {
      // 80 -> 78 (2kg 감소, 감량 목표이므로 개선 방향)
      const result = ProgressCalculator.calculateRiskStatusByTrend(
        [80, 78],
        GoalType.WEIGHT_LOSS,
      );
      expect(result.status).toBe(RiskStatus.GREEN);
      expect(result.flags).toContain("rapid_progress");
    });

    it("급변 임계값 이상 증가(목표와 반대 방향)면 rapid_decline 플래그가 붙는다", () => {
      // 80 -> 82 (2kg 증가, 감량 목표에 역행)
      const result = ProgressCalculator.calculateRiskStatusByTrend(
        [80, 82],
        GoalType.WEIGHT_LOSS,
      );
      expect(result.flags).toContain("rapid_decline");
    });

    it("목표 방향으로 개선 중이고 정체/급변이 아니면 GREEN", () => {
      // 80 -> 79 (1kg 감소, 정체(0.5) 초과 급변(1.5) 미만)
      const result = ProgressCalculator.calculateRiskStatusByTrend(
        [80, 79],
        GoalType.WEIGHT_LOSS,
      );
      expect(result.status).toBe(RiskStatus.GREEN);
      expect(result.flags).toEqual([]);
    });

    it("단기 역행이지만 장기적으로 개선 중이면(측정 3회 이상) YELLOW", () => {
      // 근력 상승: 50 -> 60 -> 56 (최근 4kg 하락, 정체(2.5)~급변(7.5) 중간, 하지만 전체적으로는 +6 개선)
      const result = ProgressCalculator.calculateRiskStatusByTrend(
        [50, 60, 56],
        GoalType.STRENGTH_UP,
      );
      expect(result.status).toBe(RiskStatus.YELLOW);
    });

    it("지속적으로 역행하면(장기적으로도 악화) RED", () => {
      // 근력 상승: 60 -> 55 -> 50 (최근 5kg 하락, 전체적으로도 -10 악화)
      const result = ProgressCalculator.calculateRiskStatusByTrend(
        [60, 55, 50],
        GoalType.STRENGTH_UP,
      );
      expect(result.status).toBe(RiskStatus.RED);
    });

    it("측정 2회뿐이고 역행하면 장기추세 확인 없이 즉시 RED", () => {
      const result = ProgressCalculator.calculateRiskStatusByTrend(
        [60, 55],
        GoalType.STRENGTH_UP,
      );
      expect(result.status).toBe(RiskStatus.RED);
    });

    describe("MAINTENANCE(유지) 목표", () => {
      it("정체 임계값 이내 변화는 GREEN(정상 유지)으로 판정한다", () => {
        const result = ProgressCalculator.calculateRiskStatusByTrend(
          [70, 70.2],
          GoalType.MAINTENANCE,
        );
        expect(result.status).toBe(RiskStatus.GREEN);
      });

      it("급변 임계값 이상 변화는 YELLOW + rapid_change 플래그", () => {
        const result = ProgressCalculator.calculateRiskStatusByTrend(
          [70, 71.5],
          GoalType.MAINTENANCE,
        );
        expect(result.status).toBe(RiskStatus.YELLOW);
        expect(result.flags).toContain("rapid_change");
      });

      it("정체와 급변 사이의 중간 변화도 YELLOW로 판정한다", () => {
        const result = ProgressCalculator.calculateRiskStatusByTrend(
          [70, 70.7],
          GoalType.MAINTENANCE,
        );
        expect(result.status).toBe(RiskStatus.YELLOW);
        expect(result.flags).toEqual([]);
      });
    });
  });

  describe("isMeasurementOverdue", () => {
    it("마지막 측정 기록이 없으면 false", () => {
      expect(ProgressCalculator.isMeasurementOverdue(null)).toBe(false);
      expect(ProgressCalculator.isMeasurementOverdue(undefined)).toBe(false);
    });

    it("14일 미만 경과 시 false", () => {
      const thirteenDaysAgo = new Date(Date.now() - 13 * 24 * 60 * 60 * 1000);
      expect(ProgressCalculator.isMeasurementOverdue(thirteenDaysAgo)).toBe(
        false,
      );
    });

    it("14일(경계값) 이상 경과 시 true", () => {
      const fourteenDaysAgo = new Date(
        Date.now() - 14 * 24 * 60 * 60 * 1000 - 1000,
      );
      expect(ProgressCalculator.isMeasurementOverdue(fourteenDaysAgo)).toBe(
        true,
      );
    });
  });

  describe("generateMilestoneBlocks", () => {
    it("12주 프로그램은 적응(1) -> 강도(1) -> 정착(1) 3블록으로 나뉜다", () => {
      const blocks = ProgressCalculator.generateMilestoneBlocks(
        new Date("2026-01-01"),
        12,
      );
      expect(blocks).toHaveLength(3);
      expect(blocks[0].purpose).toBe(BlockPurpose.ADAPTATION);
      expect(blocks[1].purpose).toBe(BlockPurpose.INTENSITY);
      expect(blocks[2].purpose).toBe(BlockPurpose.CONSOLIDATION);
      expect(blocks[2].endWeek).toBe(12);
    });
  });
});
