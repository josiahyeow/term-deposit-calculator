import { expect, test } from "vitest";
import { calculateCompoundInterest } from "./calculate-compound-interest";

test("calculates compound interest correctly when values are more than 0", () => {
  const result = calculateCompoundInterest({
    principal: 100000,
    rate: 0.011,
    compoundsPerYear: 4,
    time: 3,
  });
  expect(result).toBeCloseTo(103350, 0);
});

test("calculates compound interest correctly with different valid values", () => {
  const result = calculateCompoundInterest({
    principal: 3000,
    rate: 0.05,
    compoundsPerYear: 1,
    time: 2.5,
  });
  expect(result).toBeCloseTo(3389, 0);
});

test("throws error if principal is negative", () => {
  expect(() =>
    calculateCompoundInterest({
      principal: -1000,
      rate: 0.05,
      compoundsPerYear: 4,
      time: 2,
    })
  ).toThrowError("Principle must be more than 0");
});

test("throws error if principal is 0", () => {
  expect(() =>
    calculateCompoundInterest({
      principal: 0,
      rate: 0.05,
      compoundsPerYear: 4,
      time: 2,
    })
  ).toThrowError("Principle must be more than 0");
});

test("throws error if rate is negative", () => {
  expect(() =>
    calculateCompoundInterest({
      principal: 1000,
      rate: -0.01,
      compoundsPerYear: 4,
      time: 2,
    })
  ).toThrowError("Interest rate must be more than 0");
});

test("throws error if rate is 0", () => {
  expect(() =>
    calculateCompoundInterest({
      principal: 1000,
      rate: 0,
      compoundsPerYear: 4,
      time: 2,
    })
  ).toThrowError("Interest rate must be more than 0");
});

test("throws error if compounds per year is negative", () => {
  expect(() =>
    calculateCompoundInterest({
      principal: 1000,
      rate: 0.01,
      compoundsPerYear: -1,
      time: 2,
    })
  ).toThrowError("Compounds per year must be more than 0");
});

test("throws error if compounds per year is 0", () => {
  expect(() =>
    calculateCompoundInterest({
      principal: 1000,
      rate: 0.01,
      compoundsPerYear: 0,
      time: 2,
    })
  ).toThrowError("Compounds per year must be more than 0");
});

test("throws error if time is negative", () => {
  expect(() =>
    calculateCompoundInterest({
      principal: 1000,
      rate: 0.01,
      compoundsPerYear: 1,
      time: -1,
    })
  ).toThrowError("Time must be more than 0");
});

test("throws error if time is 0", () => {
  expect(() =>
    calculateCompoundInterest({
      principal: 1000,
      rate: 0.01,
      compoundsPerYear: 1,
      time: 0,
    })
  ).toThrowError("Time must be more than 0");
});
