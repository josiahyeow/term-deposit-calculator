import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "../components/form-input";
import { FormSelect } from "../components/form-select";
import {
  calculateTermDeposit,
  InterestPaidFrequency,
} from "./calculate-term-deposit";
import "./term-deposit-calculator.css";
import {
  calculateProjectedSavings,
  ProjectedSavings,
} from "./calculate-projected-savings";

type InterestPaidOption = { name: string; value: InterestPaidFrequency };
type TermDepositFormData = {
  amount: number;
  interestRatePercent: number;
  investmentTermMonths: number;
  interestPaidFrequency: InterestPaidFrequency;
};

const INTEREST_PAID_OPTIONS: InterestPaidOption[] = [
  { name: "Monthly", value: "monthly" },
  { name: "Quarterly", value: "quarterly" },
  { name: "Annually", value: "annually" },
  { name: "At Maturity", value: "at-maturity" },
];

export function TermDepositCalculator() {
  const [finalBalance, setFinalBalance] = useState<number | null>(null);
  const [projectedSavings, setProjectedSavings] = useState<ProjectedSavings>(
    [],
  );
  const methods = useForm<TermDepositFormData>({
    mode: "onChange",
    defaultValues: {
      amount: 10000,
      interestRatePercent: 1.1,
      investmentTermMonths: 36,
      interestPaidFrequency: "at-maturity" as const,
    },
  });
  const {
    handleSubmit,
    formState: { defaultValues },
  } = methods;

  const calculate = useCallback((values: TermDepositFormData) => {
    const { finalBalance } = calculateTermDeposit({
      amountDollars: values.amount,
      interestRateDecimal: values.interestRatePercent / 100,
      investmentTermMonths: values.investmentTermMonths,
      interestPaidFrequency: values.interestPaidFrequency,
    });

    const projectedSavings = calculateProjectedSavings({
      amountDollars: values.amount,
      interestRateDecimal: values.interestRatePercent / 100,
      investmentTermMonths: values.investmentTermMonths,
      interestPaidFrequency: values.interestPaidFrequency,
    });

    setFinalBalance(finalBalance);
    setProjectedSavings(projectedSavings);
  }, []);

  const onSubmit = handleSubmit(calculate);

  useEffect(() => {
    calculate(defaultValues as TermDepositFormData);
  }, [calculate, defaultValues]);

  return (
    <div className="layout">
      <FormProvider {...methods}>
        <form>
          <div className="form-fields">
            <FormInput
              id="amount"
              label="Deposit amount ($)"
              type="number"
              onBlur={onSubmit}
              fieldOptions={{
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "Please enter a deposit amount. e.g 1000",
                },
                min: {
                  value: 1000,
                  message: "Deposit amount must be $1,000 or more",
                },
                max: {
                  value: 1500000,
                  message: "Deposit amount cannot exceed $1,500,000",
                },
              }}
            />
            <FormInput
              id="interestRatePercent"
              label="Interest rate (% p.a.)"
              type="number"
              step="0.01"
              onBlur={onSubmit}
              fieldOptions={{
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "Please enter an interest rate. e.g. 2.5%",
                },
                min: {
                  value: 0.01,
                  message: "Interest rate must be more than 0%",
                },
                max: {
                  value: 15,
                  message: "Interest rate cannot exceed 15%",
                },
              }}
            />
            <FormInput
              id="investmentTermMonths"
              label="Investment term (months)"
              type="number"
              onBlur={onSubmit}
              fieldOptions={{
                valueAsNumber: true,
                required: {
                  value: true,
                  message: "Please enter an investment term. e.g. 12 months",
                },
                min: {
                  value: 3,
                  message: "Investment term must be more than 3 months",
                },
                max: {
                  value: 60,
                  message: "Investment term cannot exceed than 60 months",
                },
              }}
            />
            <FormSelect
              id="interestPaidFrequency"
              label="Interest paid"
              options={INTEREST_PAID_OPTIONS}
              onChange={onSubmit}
              fieldOptions={{
                required: true,
              }}
            />
          </div>
        </form>
      </FormProvider>
      <div className="result">
        <span className="result-label">Final balance</span>
        <span className="result-amount">
          {finalBalance && !Number.isNaN(finalBalance)
            ? `$${Math.round(finalBalance).toLocaleString()}`
            : "-"}
        </span>
        <table>
          <tr>
            <th>Month</th>
            <th>Interest Rate</th>
            <th>Interest Earned</th>
            <th>Balance</th>
          </tr>
          {projectedSavings.map((result) => (
            <tr key={result.month}>
              <td>{result.month}</td>
              <td>{result.interestRate}</td>
              <td>{result.interestEarned}</td>
              <td>{result.balance}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}
