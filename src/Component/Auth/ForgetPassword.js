import React, { Fragment, useRef } from "react";
import classes from "./ForgetPassWord.module.css";
import MainNav from "../Layouts/MainNav";
import { useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const emailref = useRef();
  const navigateLogin = useNavigate();

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const entredEmail = emailref.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAZ6ICn5fDGs2UVskqPLj81R8K0tShMQWs",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: entredEmail,
        }),
        headers: { "content-Type": "application/json" },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          let errMessage = "Authentication Failed!";
          throw new Error(errMessage);
        }
      })
      .then((data) => {
        console.log(data);
        alert("Reset Password Request send to Registered Email");
        navigateLogin("/login");
      })
      .catch((err) => {
        alert(err);
      });
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
