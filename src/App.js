import React, { useContext } from "react";
import SignUp from "./Component/Auth/SignUp";
import Home from "./Component/Home/Home";
import Login from "./Component/Auth/Login";
import UpdateProfile from "./Component/Home/Update";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./Store/auth-context";
import ForgetPassword from "./Component/Auth/ForgetPassword";
import WelcomePage from "./Component/WelcomePage/WelcomePage";
import ExpensePage from "./Component/Expenses-page/ExpensePage";

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {authCtx.islogin && <Route path="/home" element={<Home />} />}

        {!authCtx.islogin && <Route path="/signup" element={<SignUp />} />}
        {!authCtx.islogin && <Route path="/login" element={<Login />} />}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/expense" element={<ExpensePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
