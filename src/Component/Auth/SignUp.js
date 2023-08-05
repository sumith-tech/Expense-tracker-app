import React, { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";
import MainNav from "../Layouts/MainNav";
const SignUp = (props) => {
  const emailref = useRef();
  const passwordref = useRef();
  const confirmPasswordref = useRef();

  const navigate = useNavigate();
  const onsubmitHandler = (e) => {
    e.preventDefault();
    const entredEmail = emailref.current.value;
    const entredPassword = passwordref.current.value;
    const entredConfirmPass = confirmPasswordref.current.value;
    if (entredPassword !== entredConfirmPass) {
      alert("PassWord didnot Match");
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZ6ICn5fDGs2UVskqPLj81R8K0tShMQWs",
        {
          method: "POST",
          body: JSON.stringify({
            email: entredEmail,
            password: entredPassword,
            returnSecureToken: true,
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
          navigate("/login");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };
  return (
    <Fragment>
      <MainNav />
      <section className={classes.auth}>
        <h1>SignUp</h1>
        <form onSubmit={onsubmitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={emailref}></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordref}
            ></input>
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              required
              ref={confirmPasswordref}
            ></input>
          </div>
          <div className={classes.actions}>
            <button className={classes.toggle}>Sign Up!</button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};
export default SignUp;
