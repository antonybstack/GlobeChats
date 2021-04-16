import React, { useContext, useState, useEffect } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { AuthContext } from "../contexts/AuthContext";

const NavigationBar = () => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

  const unauthenticatedNavBar = () => {
    return (
      <>
        <div id="account-wrapper">
          <Login />
        </div>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <div id="account-wrapper">
          <Logout />
        </div>
      </>
    );
  };

  return <>{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}</>;
};

export default NavigationBar;
