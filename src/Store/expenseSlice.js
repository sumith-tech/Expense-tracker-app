import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = { expense: [], premium: true };
const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    addExpense(state, action) {
      state.expense = action.payload;
    },
    setpremium(state) {
      state.premium = false;
    },
  },
});

export default expenseSlice;
export const expenseAction = expenseSlice.actions;
