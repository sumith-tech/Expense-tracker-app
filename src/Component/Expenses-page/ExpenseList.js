import React, { useState } from "react";
import { Button } from "react-bootstrap";

const ExpenseList = (props) => {
  const DeleteExpenseHandler = async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-414ae-default-rtdb.firebaseio.com/expense/${props.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await response.json();
      console.log(data);
      props.fatchdata();
    } catch (err) {
      alert(err.message);
    }
  };

  const editExpenseHandler = () => {
    props.editExpense(props.id);
  };
  return (
    <tr style={{ textAlign: "center" }}>
      <td>{props.description}</td>
      <td>{props.category}</td>
      <td>{props.expense}</td>
      <td>
        <Button onClick={editExpenseHandler} variant="success">
          Edit
        </Button>
      </td>
      <td>
        <Button onClick={DeleteExpenseHandler} variant="danger">
          Delete
        </Button>
      </td>
    </tr>
  );
};
export default ExpenseList;
