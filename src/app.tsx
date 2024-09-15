import { ErrorBoundary } from "react-error-boundary";
import "./App.css";
import { TermDepositCalculator } from "./calculator/term-deposit-calculator";
import { ErrorFallback } from "./error";

export function App() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <div>
        <h1>Term deposit calculator</h1>
        <TermDepositCalculator />
      </div>
    </ErrorBoundary>
  );
}
