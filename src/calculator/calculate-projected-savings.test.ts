import { describe, it, expect } from "vitest";
import { calculateProjectedSavings } from "./calculate-projected-savings";

describe("calculate projected savings", () => {
  it("outputs value for first month", () => {
    const result = calculateProjectedSavings({
      amountDollars: 10000,
      interestRateDecimal: 0.011,
      investmentTermMonths: 12,
      interestPaidFrequency: "monthly",
    });
    expect(result).toEqual([
      {
        balance: "10009.17",
        interestRate: "1.10",
        interestEarned: "9.17",
        month: 1,
      },
      {
        balance: "10018.34",
        interestRate: "1.10",
        interestEarned: "18.34",
        month: 2,
      },
      {
        balance: "10027.53",
        interestRate: "1.10",
        interestEarned: "27.53",
        month: 3,
      },
      {
        balance: "10036.72",
        interestRate: "1.10",
        interestEarned: "36.72",
        month: 4,
      },
      {
        balance: "10045.92",
        interestRate: "1.10",
        interestEarned: "45.92",
        month: 5,
      },
      {
        balance: "10055.13",
        interestRate: "1.10",
        interestEarned: "55.13",
        month: 6,
      },
      {
        balance: "10064.34",
        interestRate: "1.10",
        interestEarned: "64.34",
        month: 7,
      },
      {
        balance: "10073.57",
        interestRate: "1.10",
        interestEarned: "73.57",
        month: 8,
      },
      {
        balance: "10082.80",
        interestRate: "1.10",
        interestEarned: "82.80",
        month: 9,
      },
      {
        balance: "10092.05",
        interestRate: "1.10",
        interestEarned: "92.05",
        month: 10,
      },
      {
        balance: "10101.30",
        interestRate: "1.10",
        interestEarned: "101.30",
        month: 11,
      },
      {
        balance: "10110.56",
        interestRate: "1.10",
        interestEarned: "110.56",
        month: 12,
      },
    ]);
  });
});
