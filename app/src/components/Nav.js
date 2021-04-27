import React, { useContext } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { AuthContext } from "../contexts/AuthContext";
import { useAtom } from "jotai";
import { isUserAuthenticated } from "../atoms/AuthAtom";

const NavigationBar = () => {
  //const { isAuthenticated } = useContext(AuthContext);
  const [isAuthenticated] = useAtom(isUserAuthenticated);

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
