import React, { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authAction } from "../../Store/authSlice";
import classes from "./Login.module.css";
import MainNav from "../Layouts/MainNav";

const Login = (props) => {
  const dispatch = useDispatch();
  const emailref = useRef();
  const passwordref = useRef();
  const navigateHome = useNavigate();

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

        dispatch(authAction.login(data.idToken));

        navigateHome("/");
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
          <div>
            <Link to={"/ForgetPassword"} style={{ textDecoration: "none" }}>
              Forget Password
            </Link>
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
