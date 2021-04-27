import React, { useState, useContext, useRef } from "react";
import { GoogleLogout } from "react-google-login";
import { AuthContext } from "../contexts/AuthContext";
import { useAtom } from "jotai";
import { userAtom, fetchUserAtom, isUserAuthenticated } from "../atoms/AuthAtom";
import axios from "axios";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Logout = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isUserAuthenticated);
  const [, fetchUser] = useAtom(fetchUserAtom);

  const handleGoogleLogout = (response) => {
    axios
      .post("/api/users/logout", null, {})
      .then((res) => {
        const { isAuthenticated, user } = res.data;
        setUser(user);
        setIsAuthenticated(false);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <div className="nav-item">
      <GoogleLogout clientId={REACT_APP_GOOGLE_CLIENT_ID} buttonText="Logout" onLogoutSuccess={handleGoogleLogout}></GoogleLogout>
    </div>
  );
};

export default Logout;
