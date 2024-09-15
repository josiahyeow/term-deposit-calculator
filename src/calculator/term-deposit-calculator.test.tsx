import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { calculateTermDeposit } from "./calculate-term-deposit";
import { TermDepositCalculator } from "./term-deposit-calculator";

vi.mock("./calculate-term-deposit");

describe("TermDepositCalculator", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("shows form fields with default values", async () => {
    render(<TermDepositCalculator />);

    await waitFor(() => {
      expect(screen.getByLabelText("Deposit amount ($)")).toHaveValue(10000);
      expect(screen.getByLabelText(/Interest rate \(% p.a.\)/)).toHaveValue(
        1.1
      );
      expect(screen.getByLabelText("Investment term (months)")).toHaveValue(36);
      expect(screen.getByLabelText("Interest paid")).toHaveValue("at-maturity");
    });
  });

  describe("amount field", () => {
    test.each([1000, 50000, 1500000])(
      "updates calculation when valid amount is entered (%j)",
      async (input) => {
        render(<TermDepositCalculator />);
        const amountInput = screen.getByLabelText("Deposit amount ($)");

        await userEvent.clear(screen.getByLabelText("Deposit amount ($)"));
        await userEvent.type(amountInput, input.toString());
        await userEvent.tab();

        await waitFor(() => {
          expect(calculateTermDeposit).toHaveBeenCalledWith({
            amountDollars: input,
            interestRateDecimal: expect.any(Number),
            investmentTermYears: expect.any(Number),
            interestPaidFrequency: expect.any(String),
          });

          expect(
            screen.queryByText(/Please enter a deposit amount/)
          ).toBeFalsy();
        });
      }
    );

    test("shows error message when amount is empty", async () => {
      render(<TermDepositCalculator />);

      await userEvent.clear(screen.getByLabelText("Deposit amount ($)"));
      await userEvent.tab();

      expect(
        await screen.findByText(/Please enter a deposit amount/)
      ).toBeInTheDocument();
    });

    test("shows error message when amount is less than 1000", async () => {
      render(<TermDepositCalculator />);
      const amountInput = screen.getByLabelText("Deposit amount ($)");
      await userEvent.clear(amountInput);
      await userEvent.type(amountInput, "999");
      await userEvent.tab();
      expect(
        await screen.findByText("Deposit amount must be $1,000 or more")
      ).toBeInTheDocument();
    });

    test("shows error message when amount is more than 1.5 million", async () => {
      render(<TermDepositCalculator />);
      const amountInput = screen.getByLabelText("Deposit amount ($)");

      await userEvent.clear(amountInput);
      await userEvent.type(amountInput, "15000001");
      await userEvent.tab();

      expect(
        await screen.findByText("Deposit amount cannot exceed $1,500,000")
      ).toBeInTheDocument();
    });
  });

  describe("interest rate percent field", () => {
    test.each([
      [0.01, 0.0001],
      [5.5, 0.055],
      [15, 0.15],
    ])(
      "converts percentage to decimal and updates calculation when valid value is entered (%j -> %j)",
      async (input, expected) => {
        render(<TermDepositCalculator />);
        const rateInput = screen.getByLabelText(/Interest rate \(% p.a.\)/);
        await userEvent.clear(rateInput);
        await userEvent.type(rateInput, input.toString());
        await userEvent.tab();

        await waitFor(() => {
          expect(calculateTermDeposit).toHaveBeenCalledWith({
            amountDollars: expect.any(Number),
            interestRateDecimal: expected,
            investmentTermYears: expect.any(Number),
            interestPaidFrequency: expect.any(String),
          });

          expect(
            screen.queryByText(/Please enter an interest rate/)
          ).toBeFalsy();
        });
      }
    );

    test("shows error message when interest rate is empty", async () => {
      render(<TermDepositCalculator />);

      await userEvent.clear(screen.getByLabelText(/Interest rate \(% p.a.\)/));
      expect(
        await screen.findByText("Please enter an interest rate. e.g. 2.5%")
      ).toBeInTheDocument();
    });

    test("shows error message when interest rate is less than 0.01", async () => {
      render(<TermDepositCalculator />);
      const interestRate = screen.getByLabelText(/Interest rate \(% p.a.\)/);
      await userEvent.clear(interestRate);
      await userEvent.type(interestRate, "0");
      await userEvent.tab();
      expect(
        await screen.findByText("Interest rate must be more than 0%")
      ).toBeInTheDocument();
    });

    test("shows error message when interest rate is more than 15%", async () => {
      render(<TermDepositCalculator />);
      const interestRate = screen.getByLabelText(/Interest rate \(% p.a.\)/);
      await userEvent.clear(interestRate);
      await userEvent.type(interestRate, "15.1");
      await userEvent.tab();
      expect(
        await screen.findByText("Interest rate cannot exceed 15%")
      ).toBeInTheDocument();
    });
  });

  describe("investment term field", () => {
    test.each([
      [3, 0.25],
      [12, 1],
      [18, 1.5],
      [60, 5],
    ])(
      "converts months to years and updates calculation when valid value is entered (%j -> %j)",
      async (input, expected) => {
        render(<TermDepositCalculator />);
        const termInput = screen.getByLabelText("Investment term (months)");
        await userEvent.clear(termInput);
        await userEvent.type(termInput, input.toString());
        await userEvent.tab();

        await waitFor(() => {
          expect(calculateTermDeposit).toHaveBeenCalledWith({
            amountDollars: expect.any(Number),
            interestRateDecimal: expect.any(Number),
            investmentTermYears: expected,
            interestPaidFrequency: expect.any(String),
          });

          expect(
            screen.queryByText(
              "Please enter an investment term. e.g. 12 months"
            )
          ).toBeFalsy();
        });
      }
    );

    test("shows error message investment term is empty", async () => {
      render(<TermDepositCalculator />);

      userEvent.clear(screen.getByLabelText("Investment term (months)"));
      expect(
        await screen.findByText(
          "Please enter an investment term. e.g. 12 months"
        )
      ).toBeInTheDocument();
    });

    test("shows error message investment term is less than 3", async () => {
      render(<TermDepositCalculator />);
      const termInput = screen.getByLabelText("Investment term (months)");
      await userEvent.clear(termInput);
      await userEvent.type(termInput, "2");
      await userEvent.tab();
      expect(
        await screen.findByText("Investment term must be more than 3 months")
      ).toBeInTheDocument();
    });

    test("shows error message investment term is more than 60", async () => {
      render(<TermDepositCalculator />);
      const termInput = screen.getByLabelText("Investment term (months)");
      await userEvent.clear(termInput);
      await userEvent.type(termInput, "61");
      await userEvent.tab();
      expect(
        await screen.findByText("Investment term cannot exceed than 60 months")
      ).toBeInTheDocument();
    });
  });

  describe("interest paid frequency field", () => {
    test.each(["monthly", "quarterly", "annually", "at-maturity"])(
      "updates calculation when %j value is selected",
      async (input) => {
        render(<TermDepositCalculator />);
        const interestPaidSelect = screen.getByLabelText("Interest paid");
        await userEvent.selectOptions(interestPaidSelect, [input]);

        await waitFor(() => {
          expect(calculateTermDeposit).toHaveBeenCalledWith({
            amountDollars: expect.any(Number),
            interestRateDecimal: expect.any(Number),
            investmentTermYears: expect.any(Number),
            interestPaidFrequency: input,
          });

          expect(
            screen.queryByText(
              "Please enter an investment term. e.g. 12 months"
            )
          ).toBeFalsy();
        });
      }
    );
  });

  describe("final balance", () => {
    test.each([
      [1.2, "$1"],
      [10000.5, "$10,001"],
      [999999.8, "$1,000,000"],
    ])(
      "rounds and shows final balance when all fields are valid (%j -> %j)",
      async (input, expected) => {
        vi.mocked(calculateTermDeposit).mockReturnValue(input);

        render(<TermDepositCalculator />);

        const amountInput = screen.getByLabelText("Deposit amount ($)");
        await userEvent.click(amountInput);
        await userEvent.tab();

        await waitFor(() => {
          expect(screen.getByText("Final balance")).toBeInTheDocument();
          expect(screen.getByText(expected)).toBeInTheDocument();
        });
      }
    );

    test("does not show balance if calculation fails", async () => {
      vi.mocked(calculateTermDeposit).mockImplementation(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        () => new Error("failed to calculate") as any
      );

      render(<TermDepositCalculator />);

      const amountInput = screen.getByLabelText("Deposit amount ($)");
      await userEvent.click(amountInput);
      await userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("Final balance")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
      });
    });

    test("does not show balance if calculation returns a non number", async () => {
      vi.mocked(calculateTermDeposit).mockReturnValue(NaN);

      render(<TermDepositCalculator />);

      const amountInput = screen.getByLabelText("Deposit amount ($)");
      await userEvent.click(amountInput);
      await userEvent.tab();

      await waitFor(() => {
        expect(screen.getByText("Final balance")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
      });
    });

    test("does not show balance if form is invalid", async () => {
      vi.mocked(calculateTermDeposit).mockReturnValue(NaN);

      render(<TermDepositCalculator />);

      const amountInput = screen.getByLabelText("Deposit amount ($)");
      userEvent.clear(amountInput);

      await waitFor(() => {
        expect(screen.getByText("Final balance")).toBeInTheDocument();
        expect(screen.getByText("-")).toBeInTheDocument();
      });
    });
  });
});
