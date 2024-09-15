import { beforeEach, describe, expect, test, vi } from "vitest";
import { calculateTermDeposit } from "./calculate-term-deposit";
import { calculateCompoundInterest } from "./formulas/calculate-compound-interest";
import { calculateInterest } from "./formulas/calculate-interest";

vi.mock("./formulas/calculate-compound-interest");
vi.mock("./formulas/calculate-interest");

beforeEach(() => {
  vi.clearAllMocks();
});

describe("interest paid at maturity", () => {
  test("calculates term deposit using interest formula", () => {
    vi.mocked(calculateInterest).mockReturnValue(1100);

    const result = calculateTermDeposit({
      amountDollars: 1000,
      interestRateDecimal: 0.05,
      investmentTermYears: 2,
      interestPaidFrequency: "at-maturity",
    });
    expect(calculateInterest).toHaveBeenCalledWith({
      principal: 1000,
      rate: 0.05,
      time: 2,
    });
    expect(result).toBe(1100);
  });

  test("calculates term deposit using interest formula", () => {
    vi.mocked(calculateInterest).mockReturnValue(1101);

    const result = calculateTermDeposit({
      amountDollars: 1000,
      interestRateDecimal: 0.05,
      investmentTermYears: 2,
      interestPaidFrequency: "at-maturity",
    });
    expect(calculateInterest).toHaveBeenCalledWith({
      principal: 1000,
      rate: 0.05,
      time: 2,
    });
    expect(result).toBe(1101);
  });
});

describe("interest paid monthly", () => {
  test("calculates term deposit using compound interest formula", () => {
    vi.mocked(calculateCompoundInterest).mockReturnValue(3000);

    const result = calculateTermDeposit({
      amountDollars: 1000,
      interestRateDecimal: 0.05,
      investmentTermYears: 2,
      interestPaidFrequency: "monthly",
    });
    expect(calculateCompoundInterest).toHaveBeenCalledWith({
      principal: 1000,
      rate: 0.05,
      time: 2,
      compoundsPerYear: 12,
    });
    expect(result).toBe(3000);
  });
});

describe("interest paid quarterly", () => {
  test("calculates term deposit using compound interest formula", () => {
    vi.mocked(calculateCompoundInterest).mockReturnValue(100000.8);

    const result = calculateTermDeposit({
      amountDollars: 1000,
      interestRateDecimal: 0.05,
      investmentTermYears: 2,
      interestPaidFrequency: "quarterly",
    });
    expect(calculateCompoundInterest).toHaveBeenCalledWith({
      principal: 1000,
      rate: 0.05,
      time: 2,
      compoundsPerYear: 4,
    });
    expect(result).toBe(100000.8);
  });
});

describe("interest paid annually", () => {
  test("calculates term deposit using compound interest formula", () => {
    vi.mocked(calculateCompoundInterest).mockReturnValue(5000.01);

    const result = calculateTermDeposit({
      amountDollars: 1000,
      interestRateDecimal: 0.05,
      investmentTermYears: 2,
      interestPaidFrequency: "annually",
    });
    expect(calculateCompoundInterest).toHaveBeenCalledWith({
      principal: 1000,
      rate: 0.05,
      time: 2,
      compoundsPerYear: 1,
    });
    expect(result).toBe(5000.01);
  });
});
