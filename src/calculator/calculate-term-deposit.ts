import { calculateCompoundInterest } from "./formulas/calculate-compound-interest";
import { calculateInterest } from "./formulas/calculate-interest";

export type InterestPaidFrequency =
  | "monthly"
  | "quarterly"
  | "annually"
  | "at-maturity";

export type TermDepositInput = {
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
