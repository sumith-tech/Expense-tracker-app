import React, { Fragment } from "react";
import MainNav from "../Layouts/MainNav";
import ExpenseForm from "./ExpenseForm";
const ExpensePage = () => {
  return (
    <Fragment>
      <MainNav />
      <ExpenseForm />
    </Fragment>
  );
};
export default ExpensePage;
