import { describe, it } from "vitest";
import { calculateProjectedSavings } from "./calculate-term-deposit";

describe("calculate projected savings", () => {
  it("outputs value for first month", () => {
    const result = calculateProjectedSavings({
      amountDollars: 10000,
      interestRateDecimal: 0.011,
      investmentTermMonths: 12,
      interestPaidFrequency: "monthly",
    });
    console.log(result);
  });
});
