import React, { useState, useContext, useRef } from "react";
import { GoogleLogout } from "react-google-login";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Logout = () => {
  const authContext = useContext(AuthContext);

  const handleGoogleLogout = (response) => {
    axios
      .post("/api/users/logout", null, {})
      .then((res) => {
        const { isAuthenticated, user } = res.data;
        authContext.setUser(user);
        authContext.setIsAuthenticated(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="nav-item">
      <GoogleLogout clientId={REACT_APP_GOOGLE_CLIENT_ID} buttonText="Logout" onLogoutSuccess={handleGoogleLogout}></GoogleLogout>
    </div>
  );
};

export default Logout;
