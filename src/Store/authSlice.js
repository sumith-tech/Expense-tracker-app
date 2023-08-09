import { createSlice } from "@reduxjs/toolkit";

const initialAuthstate = { token: "", isloggedin: false };
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthstate,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isloggedin = !!state.token;
    },
    updateToken(state) {
      state.token = localStorage.getItem("token");
      state.isloggedin = !!state.token;
    },
  },
});
export default authSlice;
export const authAction = authSlice.actions;
