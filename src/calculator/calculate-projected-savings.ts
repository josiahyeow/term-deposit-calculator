import {
  calculateTermDeposit,
  TermDepositInput,
} from "./calculate-term-deposit";

export type ProjectedSavings = {
  month: number;
  interestRate: string;
  interestEarned: string;
  balance: string;
}[];

export function calculateProjectedSavings({
  amountDollars,
  interestRateDecimal,
  investmentTermMonths,
  interestPaidFrequency,
}: TermDepositInput): ProjectedSavings {
  const results = [];

  for (let i = 1; i <= investmentTermMonths; i++) {
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
