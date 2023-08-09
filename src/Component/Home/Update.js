import React, { Fragment, useContext, useRef } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const UpdateProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const nameref = useRef();
  const imgref = useRef();
  const navigateHome = useNavigate();
  const onsubmitHandler = async (e) => {
    e.preventDefault();
    const entredName = nameref.current.value;
    const entredImg = imgref.current.value;
    console.log(token);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAZ6ICn5fDGs2UVskqPLj81R8K0tShMQWs",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: entredName,
            photoUrl: entredImg,
            deleteAttribute: null,
            returnSecureToken: true,
          }),
          headers: { "content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong");
      }

      const data = await response.json();
      navigateHome("/home");
    } catch (err) {
      alert(err.message);
    }
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
