/**
 * RelativeStrengthCalculator 단위 테스트
 * 체중 대비 근력 비율(상대적 강도) 계산 — Strength Level 판정의 입력값이 되는 핵심 계산.
 */
import { RelativeStrengthCalculator } from "./relative-strength-calculator";
import { OneRepMaxFormula } from "./one-rep-max-calculator";

describe("RelativeStrengthCalculator", () => {
  describe("calculate", () => {
    it("상대적 강도를 (1RM / 체중) * 100 으로 계산한다", () => {
      const result = RelativeStrengthCalculator.calculate(100, 70);
      expect(result.relativeStrength).toBeCloseTo(142.86, 2);
      expect(result.oneRepMax).toBe(100);
      expect(result.bodyWeight).toBe(70);
    });

    it("체중이 0 이하면 예외를 던진다", () => {
      expect(() => RelativeStrengthCalculator.calculate(100, 0)).toThrow();
      expect(() => RelativeStrengthCalculator.calculate(100, -10)).toThrow();
    });

    it("1RM이 음수면 예외를 던진다", () => {
      expect(() => RelativeStrengthCalculator.calculate(-1, 70)).toThrow();
    });
  });

  describe("calculateFromWeightAndReps", () => {
    it("무게/횟수로부터 1RM을 계산한 뒤 상대적 강도를 산출한다", () => {
      const result = RelativeStrengthCalculator.calculateFromWeightAndReps(
        80,
        10,
        70,
        OneRepMaxFormula.EPLEY,
      );
      // 1RM(Epley) = 80 * (1 + 10/30) = 106.67 -> 상대적 강도 = 106.67/70*100
      expect(result.oneRepMax).toBe(106.67);
      expect(result.relativeStrength).toBeCloseTo((106.67 / 70) * 100, 1);
    });
  });
});
