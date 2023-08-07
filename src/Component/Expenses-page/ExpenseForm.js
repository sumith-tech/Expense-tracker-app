import React, { Fragment, useRef, useState } from "react";
import { Button, Form, Table } from "react-bootstrap";
import ExpenseList from "./ExpenseList";
const ExpenseForm = (props) => {
  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [expenses, setExpenses] = useState([]);

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const entredExpese = expenseRef.current.value;
    const description = descriptionRef.current.value;
    const entredCategory = categoryRef.current.value;
    console.log(entredExpese, entredCategory);
    const expense = {
      expense: entredExpese,
      description: description,
      category: entredCategory,
    };

    fetch(
      "https://expense-tracker-414ae-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify(expense),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          let errMessage = "Error Saving!";
          throw new Error(errMessage);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  fetch(
    "https://expense-tracker-414ae-default-rtdb.firebaseio.com/expense.json",
    {
      method: "GET",
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        let errMessage = "Error Saving!";
        throw new Error(errMessage);
      }
    })
    .then((data) => {
      const loadeddata = [];
      for (const key in data) {
        loadeddata.push({
          id: key,
          expense: data[key].expense,
          category: data[key].category,
          description: data[key].description,
        });
      }
      setExpenses(loadeddata);
    })
    .catch((err) => {
      alert(err);
    });
  const expenseslist = expenses.map((item) => (
    <ExpenseList
      expense={item.expense}
      category={item.category}
      description={item.description}
    />
  ));

  return (
    <Fragment>
      <div
        className="mx-auto col-10 col-md-8 col-lg-6"
        style={{ marginTop: "2em" }}
      >
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Enter Expense</Form.Label>
            <Form.Control ref={expenseRef} type="number" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select ref={categoryRef}>
              <option>Food</option>
              <option>Fitness</option>
              <option>Clothings</option>
              <option>Sports</option>
              <option>Education</option>
              <option>Health</option>
              <option>Others...</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Button onClick={onsubmitHandler}>Add Expense</Button>
          </Form.Group>
        </Form>
      </div>
      <h2>Expenses</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Expense Name</th>
            <th>category</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{expenseslist}</tbody>
      </Table>
    </Fragment>
  );
};
export default ExpenseForm;
