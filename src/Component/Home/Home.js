import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MainNav from "../Layouts/MainNav";
const Home = () => {
  const authid = useSelector((state) => state.auth.token);
  const [name, setname] = useState();
  const navigateHome = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAZ6ICn5fDGs2UVskqPLj81R8K0tShMQWs",
          {
            method: "POST",
            body: JSON.stringify({
              idToken: authid,
            }),
            headers: { "content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error("Something Went Wrong");
        }
        const data = await response.json();
        console.log(data.users[0].displayName);
        setname(data.users[0].displayName);
      } catch (err) {
        alert(err.message);
      }
    }
    fetchData();
  }, []);

  const verifyEmailHandler = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAZ6ICn5fDGs2UVskqPLj81R8K0tShMQWs",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: authid,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      alert(err.message);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigateHome("/login");
  };

  return (
    <Fragment>
      <MainNav />
      <div>
        <h2>Welcome to Expense Tracker</h2>
        {!name && (
          <p>
            Your profile is incomplete <Link to={"/update"}>Complete now</Link>
          </p>
        )}
        {name && <h3>{name}</h3>}
        <Button onClick={verifyEmailHandler}>Verify Email</Button>
        <div>
          <Button
            variant="danger"
            onClick={logoutHandler}
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              marginTop: "1em",
              marginRight: "1em",
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </Fragment>
  );
};
export default Home;
