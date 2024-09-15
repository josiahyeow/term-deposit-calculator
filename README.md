# Term deposit calculator

Simple term deposit calculator.

## Getting started

### Prerequisites

- [Node 20](https://github.com/nvm-sh/nvm)
- [pnpm](https://pnpm.io/installation) (npm or yarn works as well)

### Running the app

1. Install dependencies by running

```zsh
pnpm install
```

2. Start the app by running

```zsh
pnpm dev
```

3. Open the app by going to `http://localhost:5173/`

### Running tests

Run tests by running the command

```zsh
pnpm test
```

Generate test coverage report by running

```zsh
pnpm test:coverage
```

---

## Considerations

### Assumptions

- All proceeds are reinvested into the term deposit for it's duration.
- Validation rules for each field can be taken from the example on Bendigo Bank's website:
  - All fields are required.
  - _Deposit amount_ is entered in dollars and can be 1 thousand to 1.5 million dollars.
  - _Interest rate_ is per annum, entered in as a percent and can be 0 to 15%.
  - _Investment term_ is entered in months and can be 3 to 60 months.
  - _Interest paid_ can be monthly, quarterly, yearly or at maturity.
- The final balance is calculated when a form input is blurred or a select option is changed. It is displayed in Australian currency format rounded to the nearest dollar.

### Design decisions

- Kept interest formulas as pure functions so they can be easily tested and reused where required.
- Kept calculation logic outside of UI component for separation of concerns.
- Decimal rounding is only performed at the UI layer to prevent any rounding errors in the calculations.
- Used `react-hook-form` to make managing form state and validations simpler.
- Used `FormContext` in form components to avoid prop drilling.
- Calculation is performed on blur of each input field. This is to prevent unnecessary calls of the calculation function when the user types into the field.
- Top level error boundary is used so the user doesn't get a blank screen if any unhandled errors occur.

### Time constraint trade offs

Additional goals that could not be achieved due to time constraints.

- Add unit tests for `App`, `FormInput` and `FormSelect` components.
- Add more unit test cases for extra large input values.
- Add e2e test.
- Allow investment term to be input as month, year or a combination of both.
- Format field input values.
- Snap values to min or max instead of showing validation errors.
- Add sliders to adjust interest rate and investment term.
- Replace interest paid select field with a styled radio.
- UI styling.
