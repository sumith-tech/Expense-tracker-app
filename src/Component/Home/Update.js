import React, { Fragment, useContext, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import AuthContext from "../../Store/auth-context";
const UpdateProfile = () => {
  const authCtx = useContext(AuthContext);
  const nameref = useRef();
  const imgref = useRef();
  const onsubmitHandler = (e) => {
    e.preventDefault();
    const entredName = nameref.current.value;
    const entredImg = imgref.current.value;
    console.log(authCtx.token)
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZ6ICn5fDGs2UVskqPLj81R8K0tShMQWs",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          displayName: entredName,
          photoUrl: entredImg,
          deleteAttribute: null,
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
       
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Fragment>
      <header>Winners never quite,Quiters never win.</header>
      <Card>
        <Card.Header style={{ fontWeight: "bolder" }}>
          Contact Details
        </Card.Header>
        <Card.Body>
          <form>
            <label style={{ paddingRight: "1em", fontWeight: "bolder" }}>
              Full Name:
            </label>
            <input type="text" ref={nameref}></input>

            <label
              style={{
                paddingLeft: "2em",
                paddingRight: "1em",
                fontWeight: "bolder",
              }}
            >
              Profile Photo URL:
            </label>
            <input type="text" ref={imgref}></input>
            <div style={{ paddingLeft: "2em", paddingTop: "2em" }}>
              <Button onClick={onsubmitHandler} variant="success">
                Update
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </Fragment>
  );
};

export default UpdateProfile;
