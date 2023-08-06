import React, { Fragment, useContext, useRef } from "react";
import classes from "./SignUp.module.css";
import MainNav from "../Layouts/MainNav";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
const Login = (props) => {
  const emailref = useRef();
  const passwordref = useRef();
  const navigateHome = useNavigate();
  const authCtx = useContext(AuthContext);
  const onsubmitHandler = (e) => {
    e.preventDefault();
    const entredEmail = emailref.current.value;
    const entredPassword = passwordref.current.value;

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZ6ICn5fDGs2UVskqPLj81R8K0tShMQWs",
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
        console.log(data.idToken);
        localStorage.setItem("token", data.idToken);
        authCtx.savetoken(data.idToken);
        navigateHome("/home");
      })
      .catch((err) => {
        alert(err);
      });
  };
  return (
    <Fragment>
      <MainNav />
      <section className={classes.auth}>
        <h1>Login</h1>
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
          <div className={classes.actions}>
            <button className={classes.toggle}>Login</button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};
export default Login;
