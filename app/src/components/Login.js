import React, { useState, useContext, useRef, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { AuthContext } from "../contexts/AuthContext";
import { useAtom } from "jotai";
import { userAtom, fetchUserAtom, isUserAuthenticated } from "../atoms/AuthAtom";
import axios from "axios";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Login = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setIsAuthenticated] = useAtom(isUserAuthenticated);

  const handleGoogleLogin = (response) => {
    axios
      .post("/api/users/login", null, {
        headers: {
          Authorization: `Bearer ${response.tokenId}`,
        },
      })
      .then((res) => {
        const { isAuthenticated, user } = res.data;
        setUser(user);
        setIsAuthenticated(true);
        window.location.reload();
      })
      .catch(function (err) {
        console.log(err);
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
      />
    </div>
  );
};

export default Login;
