import { expect, test } from "vitest";
import { calculateInterest } from "./calculate-interest";

test("should calculate interest correctly for positive values", () => {
  const result = calculateInterest({ principal: 1000, rate: 0.05, time: 2 });
  expect(result).toBe(1100);
});

test("throws error if principal is negative", () => {
  expect(() =>
    calculateInterest({
      principal: -1000,
      rate: 0.05,
      time: 2,
    })
  ).toThrowError("Principle must be more than 0");
});

test("throws error if principal is 0", () => {
  expect(() =>
    calculateInterest({
      principal: 0,
      rate: 0.05,
      time: 2,
    })
  ).toThrowError("Principle must be more than 0");
});

test("throws error if rate is negative", () => {
  expect(() =>
    calculateInterest({
      principal: 1000,
      rate: -0.01,
      time: 2,
    })
  ).toThrowError("Interest rate must be more than 0");
});

test("throws error if rate is 0", () => {
  expect(() =>
    calculateInterest({
      principal: 1000,
      rate: 0,
      time: 2,
    })
  ).toThrowError("Interest rate must be more than 0");
});

test("throws error if time is negative", () => {
  expect(() =>
    calculateInterest({
      principal: 1000,
      rate: 0.01,
      time: -1,
    })
  ).toThrowError("Time must be more than 0");
});

test("throws error if time is 0", () => {
  expect(() =>
    calculateInterest({
      principal: 1000,
      rate: 0.01,
      time: 0,
    })
  ).toThrowError("Time must be more than 0");
});
