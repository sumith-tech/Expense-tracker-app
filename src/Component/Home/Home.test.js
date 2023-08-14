import Home from "./Home";
import { screen, render } from "@testing-library/react";
describe("ExpenseForm Component", () => {
  test("Enter Expense", () => {
    render(<Home />);

    const enterExpenseElement = screen.getByText("Welcome to Expense Tracker", {
      exact: false,
    });
    expect(enterExpenseElement).toBeInTheDocument();
  });
});
