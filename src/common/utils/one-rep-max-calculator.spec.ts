/**
 * OneRepMaxCalculator 단위 테스트
 * 운동 기록 저장 시 자동 계산되는 1RM 추정 로직(핵심 도메인 계산)을 검증한다.
 */
import {
  OneRepMaxCalculator,
  OneRepMaxFormula,
} from "./one-rep-max-calculator";

describe("OneRepMaxCalculator", () => {
  describe("epley", () => {
    it("Epley 공식으로 1RM을 계산한다: weight * (1 + reps/30)", () => {
      // 80kg x 10회 -> 80 * (1 + 10/30) = 106.666...
      expect(OneRepMaxCalculator.epley(80, 10)).toBeCloseTo(106.6667, 3);
    });

    it("무게 또는 횟수가 0 이하면 예외를 던진다", () => {
      expect(() => OneRepMaxCalculator.epley(0, 10)).toThrow();
      expect(() => OneRepMaxCalculator.epley(80, 0)).toThrow();
    });
  });

  describe("brzycki", () => {
    it("Brzycki 공식으로 1RM을 계산한다: weight * (36 / (37 - reps))", () => {
      // 80kg x 10회 -> 80 * (36/27) = 106.666...
      expect(OneRepMaxCalculator.brzycki(80, 10)).toBeCloseTo(106.6667, 3);
    });

    it("37회 이상의 반복은 계산할 수 없다", () => {
      expect(() => OneRepMaxCalculator.brzycki(80, 37)).toThrow();
    });
  });

  describe("lombardi", () => {
    it("Lombardi 공식으로 1RM을 계산한다: weight * reps^0.1", () => {
      expect(OneRepMaxCalculator.lombardi(80, 10)).toBeCloseTo(
        80 * Math.pow(10, 0.1),
        5,
      );
    });
  });

  describe("calculate", () => {
    it("기본 공식은 Epley이며 소수점 2자리로 반올림한다", () => {
      const result = OneRepMaxCalculator.calculate(80, 10);
      expect(result.formula).toBe(OneRepMaxFormula.EPLEY);
      expect(result.oneRepMax).toBe(106.67);
    });

    it("공식을 지정하면 해당 공식으로 계산한다", () => {
      const result = OneRepMaxCalculator.calculate(
        80,
        10,
        OneRepMaxFormula.BRZYCKI,
      );
      expect(result.formula).toBe(OneRepMaxFormula.BRZYCKI);
      expect(result.oneRepMax).toBe(106.67);
    });
  });

  describe("calculateAverage", () => {
    it("세 공식의 평균값을 반환한다", () => {
      const epley = OneRepMaxCalculator.epley(80, 10);
      const brzycki = OneRepMaxCalculator.brzycki(80, 10);
      const lombardi = OneRepMaxCalculator.lombardi(80, 10);
      const expected =
        Math.round(((epley + brzycki + lombardi) / 3) * 100) / 100;

      expect(OneRepMaxCalculator.calculateAverage(80, 10)).toBe(expected);
    });
  });
});
