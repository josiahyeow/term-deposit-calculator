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
  investmentTermYears: number;
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
  investmentTermYears,
  interestPaidFrequency,
}: TermDepositInput) {
  if (interestPaidFrequency === "at-maturity") {
    return calculateInterest({
      principal: amountDollars,
      rate: interestRateDecimal,
      time: investmentTermYears,
    });
  }

  return calculateCompoundInterest({
    principal: amountDollars,
    rate: interestRateDecimal,
    compoundsPerYear: interestPaymentsPerYear[interestPaidFrequency],
    time: investmentTermYears,
  });
}
