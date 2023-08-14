import React, { useContext, useEffect } from "react";
import SignUp from "./Component/Auth/SignUp";
import Home from "./Component/Home/Home";
import Login from "./Component/Auth/Login";
import UpdateProfile from "./Component/Home/Update";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgetPassword from "./Component/Auth/ForgetPassword";
import WelcomePage from "./Component/WelcomePage/WelcomePage";
import ExpensePage from "./Component/Expenses-page/ExpensePage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authAction } from "./Store/authSlice";
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.auth.isloggedin);
  useEffect(() => {
    dispatch(authAction.updateToken());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {islogin && <Route path="/home" element={<Home />} />}
          {!islogin && <Route path="/signup" element={<SignUp />} />}
          {!islogin && <Route path="/login" element={<Login />} />}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/update" element={<UpdateProfile />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          {islogin && <Route path="/expense" element={<ExpensePage />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
