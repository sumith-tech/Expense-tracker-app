import React, { useContext } from "react";
import SignUp from "./Component/Auth/SignUp";
import Home from "./Component/Home/Home";
import Login from "./Component/Auth/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "./Store/auth-context";
const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        {authCtx.islogin && <Route path="/home" element={<Home />} />}
        <Route path="/" element={<SignUp />} />
        <Route path="*" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
