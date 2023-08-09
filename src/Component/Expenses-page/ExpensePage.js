import React, { Fragment } from "react";
import MainNav from "../Layouts/MainNav";
import ExpenseForm from "./ExpenseForm";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { expenseAction } from "../../Store/expenseSlice";
const ExpensePage = () => {
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense.expense);
  const isPremium = useSelector((state) => state.expense.premium);
  let amount = 0;
  for (let i = 0; i < expense.length; i++) {
    amount += +expense[i].expense;
  }
  if (amount > 10000) {
    dispatch(expenseAction.setpremium());
  }
  console.log(isPremium);
  return (
    <Fragment>
      <MainNav />
      {!isPremium && (
        <Button
          variant="success"
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
      <ExpenseForm />
    </Fragment>
  );
};
export default ExpensePage;
