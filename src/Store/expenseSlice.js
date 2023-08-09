import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  expense: [],
  premium: true,
  showtoggle: false,
};
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

    hidepremium(state) {
      state.premium = true;
    },

    settoggle(state) {
      state.showtoggle = true;
    },
  },
});

export default expenseSlice;
export const expenseAction = expenseSlice.actions;
