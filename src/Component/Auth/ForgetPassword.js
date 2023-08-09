import React, { Fragment, useRef } from "react";
import classes from "./ForgetPassWord.module.css";
import MainNav from "../Layouts/MainNav";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const emailref = useRef();
  const navigateLogin = useNavigate();

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const entredEmail = emailref.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAZ6ICn5fDGs2UVskqPLj81R8K0tShMQWs",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: entredEmail,
          }),
          headers: { "content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Authentication Failed!");
      }
      const data = await response.json();
      navigateLogin("/login");
      alert("Reset Password Request send to Registered Email");
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Fragment>
      <MainNav />
      <section className={classes.auth}>
        <h2>Enter the Registered Email </h2>
        <form onSubmit={onsubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailref}></input>
          </div>
          <div className={classes.actions}>
            <button className={classes.toggle}>Send Request</button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};
export default ForgetPassword;
