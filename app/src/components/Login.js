import React, { useState, useContext, useRef } from "react";
import { GoogleLogin } from "react-google-login";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Login = () => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleGoogleLogin = (response) => {
    axios
      .post("/api/users/login", null, {
        headers: {
          Authorization: `Bearer ${response.tokenId}`,
        },
      })
      .then((res) => {
        const { isAuthenticated, user } = res.data;
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleGoogleFailure = (response) => {
    alert("error logging into your Google account");
  };

  return (
    <div className="nav-item">
      <GoogleLogin
        style={{ color: "red" }}
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleFailure}
        //cookiePolicy={"single_host_origin"}
        //isSignedIn
      />
    </div>
  );
};

export default Login;
