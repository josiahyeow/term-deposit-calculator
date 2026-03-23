import { calculateCompoundInterest } from "./formulas/calculate-compound-interest";
import { calculateInterest } from "./formulas/calculate-interest";

export type InterestPaidFrequency =
  | "monthly"
  | "quarterly"
  | "annually"
  | "at-maturity";

type TermDepositInput = {
  amountDollars: number;
  interestRateDecimal: number;
  investmentTermMonths: number;
  interestPaidFrequency: InterestPaidFrequency;
};

const interestPaymentsPerYear = {
  monthly: 12,
  quarterly: 4,
  annually: 1,
};

export type TermDepositOutput = {
  month: number;
  interestRate: string;
  interestEarned: string;
  balance: string;
};

export function calculateTermDeposit({
  amountDollars,
  interestRateDecimal,
  investmentTermMonths,
  interestPaidFrequency,
}: TermDepositInput) {
  if (interestPaidFrequency === "at-maturity") {
    const finalBalance = calculateInterest({
      principal: amountDollars,
      rate: interestRateDecimal,
      time: investmentTermMonths / 12,
    });
    const interestEarned = finalBalance - amountDollars;
    return {
      finalBalance,
      interestEarned,
    };
  }

  const finalBalance = calculateCompoundInterest({
    principal: amountDollars,
    rate: interestRateDecimal,
    compoundsPerYear: interestPaymentsPerYear[interestPaidFrequency],
    time: investmentTermMonths / 12,
  });

  const interestEarned = finalBalance - amountDollars;

  return {
    finalBalance,
    interestEarned,
  };
}

export function calculateProjectedSavings({
  amountDollars,
  interestRateDecimal,
  investmentTermMonths,
  interestPaidFrequency,
}: TermDepositInput): TermDepositOutput[] {
  const results = [];

  for (let i = 1; i < investmentTermMonths - 1; i++) {
    const row = calculateTermDeposit({
      amountDollars,
      interestRateDecimal,
      investmentTermMonths: i,
      interestPaidFrequency,
    });
    results.push({
      balance: row.finalBalance.toFixed(2),
      interestRate: (interestRateDecimal * 100).toFixed(2),
      interestEarned: row.interestEarned.toFixed(2),
      month: i,
    });
  }

  return results;
}
