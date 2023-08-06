import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Store/auth-context";
import { Button } from "react-bootstrap";

const Home = () => {
  const authCtx = useContext(AuthContext);
  const [name, setname] = useState();
  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAZ6ICn5fDGs2UVskqPLj81R8K0tShMQWs",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
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
        console.log(data.users[0].displayName);
        setname(data.users[0].displayName);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  const verifyEmailHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAZ6ICn5fDGs2UVskqPLj81R8K0tShMQWs",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: authCtx.token,
        }),
        headers: { "Content-Type": "application/json" },
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
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <h2>Welcome to Expense Tracker</h2>
      {!name && (
        <p>
          Your profile is incomplete <Link to={"/update"}>Complete now</Link>
        </p>
      )}
      {name && <h3>{name}</h3>}
      <Button onClick={verifyEmailHandler}>Verify Email</Button>
    </div>
  );
};
export default Home;
