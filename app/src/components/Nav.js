import React from "react";
import Login from "./Login";
import Logout from "./Logout";

const NavigationBar = () => {
  return (
    <>
      <div id="account-wrapper">
        <Login />
        <Logout />
      </div>
    </>
  );
};

export default NavigationBar;
