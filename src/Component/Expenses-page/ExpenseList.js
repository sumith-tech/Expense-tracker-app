import React, { useState } from "react";

const ExpenseList = (props) => {
  return (
    <tr>
      <td>{props.description}</td>
      <td>{props.category}</td>
      <td>{props.expense}</td>
    </tr>
  );
};
export default ExpenseList;
