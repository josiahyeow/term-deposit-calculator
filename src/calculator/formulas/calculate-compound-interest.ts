/*
Term deposit formulas
A: Final balance in dollars
P: Principal amount in dollars
r: Interest rate as decimal
t: Investment term in years
n: Number of times interest is paid per year

A = P(1 + r/n)^(nt)
*/
export function calculateCompoundInterest({
  principal,
  rate,
  compoundsPerYear: n,
  time,
}: {
  principal: number;
  rate: number;
  compoundsPerYear: number;
  time: number;
}) {
  if (principal <= 0) {
    throw new Error("Principle must be more than 0");
  }

  if (rate <= 0) {
    throw new Error("Interest rate must be more than 0");
  }

  if (n <= 0) {
    throw new Error("Compounds per year must be more than 0");
  }

  if (time <= 0) {
    throw new Error("Time must be more than 0");
  }

  return principal * Math.pow(1 + rate / n, time * n);
}
