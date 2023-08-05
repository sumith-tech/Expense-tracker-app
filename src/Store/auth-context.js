import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  savetoken: () => {},
  islogin: null,
});
export default AuthContext;

export const AuthProvider = (props) => {
  const [token, setToken] = useState("");
  const saveTokenHandler = (token) => {
    setToken(token);
  };
  const islogedin = !!token;
  const authcontext = {
    token: token,
    savetoken: saveTokenHandler,
    islogin: islogedin,
  };
  return (
    <AuthContext.Provider value={authcontext}>
        {console.log()}
      {props.children}
    </AuthContext.Provider>
  );
};
