import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Table } from "react-bootstrap";
import { expenseAction } from "../../Store/expenseSlice";
import ExpenseList from "./ExpenseList";
const ExpenseForm = (props) => {
  const usedispatch = useDispatch();
  const expenseRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const [expenses, setExpenses] = useState([]);
  const [editSwitch, setEditSwitch] = useState(false);
  const [editid, setEditid] = useState("");

  const onsubmitHandler = async (e) => {
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
    if (editSwitch) {
      try {
        const response = await fetch(
          `https://expense-tracker-414ae-default-rtdb.firebaseio.com/expense/${editid}.json`,
          { method: "PUT", body: JSON.stringify(expense) }
        );
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        const data = await response.json();
        console.log(data);
        setEditSwitch(false);
        fetchExpenseData();
      } catch (err) {
        alert(err.message);
      }
    } else {
      try {
        const response = await fetch(
          "https://expense-tracker-414ae-default-rtdb.firebaseio.com/expense.json",
          {
            method: "POST",
            body: JSON.stringify(expense),
          }
        );
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        const data = await response.json();
        fetchExpenseData();
      } catch (err) {
        alert(err.message);
      }
    }
  };
  useEffect(() => {
    fetchExpenseData();
  }, []);
  const fetchExpenseData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://expense-tracker-414ae-default-rtdb.firebaseio.com/expense.json"
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await response.json();
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

      usedispatch(expenseAction.addExpense(loadeddata));
    } catch (err) {
      alert(err.message);
    }
  }, []);

  const editExpenseHandler = async (id) => {
    console.log(id);
    setEditSwitch(true);
    setEditid(id);
  };
  const expenseslist = expenses.map((item) => (
    <ExpenseList
      key={item.id}
      id={item.id}
      expense={item.expense}
      category={item.category}
      description={item.description}
      fatchdata={fetchExpenseData}
      editExpense={editExpenseHandler}
    />
  ));

  return (
    <Fragment>
      <div
        className="mx-auto col-10 col-md-8 col-lg-6"
        style={{ marginTop: "2em" }}
      >
        <Form onSubmit={onsubmitHandler}>
          <Form.Group className="mb-3">
            {!editSwitch && <Form.Label>Enter Expense</Form.Label>}
            {editSwitch && <Form.Label>Edit Expense</Form.Label>}
            <Form.Control ref={expenseRef} type="number" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required />
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
            {!editSwitch && <Button type="submit">Add Expense</Button>}
            {editSwitch && (
              <Button variant="success" type="submit">
                Edit Expense
              </Button>
            )}
          </Form.Group>
        </Form>
      </div>
      <h2>Expenses</h2>
      <Table striped bordered hover size="sm">
        <thead>
          <tr style={{ textAlign: "center" }}>
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
