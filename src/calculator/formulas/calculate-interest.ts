/*
Interest formula
A: Final balance in dollars
P: Principal amount in dollars
r: Interest rate as decimal
t: Investment term in years

A = P(1 + rt)
*/
export function calculateInterest({
  principal,
  rate,
  time,
}: {
  principal: number;
  rate: number;
  time: number;
}) {
  if (principal <= 0) {
    throw new Error("Principle must be more than 0");
  }

  if (rate <= 0) {
    throw new Error("Interest rate must be more than 0");
  }

  if (time <= 0) {
    throw new Error("Time must be more than 0");
  }

  return principal * (1 + rate * time);
}
