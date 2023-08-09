import React, { Fragment, useState } from "react";
import MainNav from "../Layouts/MainNav";
import ExpenseForm from "./ExpenseForm";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expenseAction } from "../../Store/expenseSlice";
import classes from "./ExpensesPage.module.css";
const ExpensePage = () => {
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense.expense);
  const isPremium = useSelector((state) => state.expense.premium);
  const showtoggle = useSelector((state) => state.expense.showtoggle);
  let amount = 0;
  for (let i = 0; i < expense.length; i++) {
    amount += +expense[i].expense;
  }
  if (amount > 10000) {
    dispatch(expenseAction.setpremium());
  }

  const activateToggleHandler = () => {
    dispatch(expenseAction.settoggle());
  };
  const changetheameHandler = () => {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  const downloadFileHandler = () => {
    const makeCSV = (items) => {
      const headers = ["Amount", "Description", "Category"];
      const rows = expense.map((item) => [
        item.expense,
        item.description,
        item.category,
      ]);
      const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
      return csv;
    };
    const data = makeCSV();
    const a1 = document.getElementById("a1");
    const blob1 = new Blob([data]);
    a1.href = URL.createObjectURL(blob1);
  };

  console.log(expense);
  return (
    <div style={{ backgroundColor: `${theme}gray` }}>
      <MainNav />
      {!isPremium && (
        <Button
          variant="success"
          onClick={activateToggleHandler}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            marginTop: "1em",
            marginRight: "1em",
          }}
        >
          Upgrade Premium
        </Button>
      )}
      <h2>Total Expense:{amount}</h2>
      {showtoggle && (
        <Button
          variant="success"
          onClick={changetheameHandler}
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            marginTop: "5em",
            marginRight: "1em",
          }}
        >
          Change Theme
        </Button>
      )}
      {showtoggle && (
        <a id="a1" download="file1.csv" href="/">
          <Button onClick={downloadFileHandler}>Download File</Button>
        </a>
      )}

      <ExpenseForm />
    </div>
  );
};
export default ExpensePage;
