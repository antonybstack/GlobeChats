import React from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAtom } from "jotai";
import { isUserAuthenticated } from "../atoms/AuthAtom";
import ProfileButton from "./ProfileButton";
import logo from "../assets/logo512.png";

const NavigationBar = () => {
  //const { isAuthenticated } = useContext(AuthContext);
  const [isAuthenticated] = useAtom(isUserAuthenticated);

  const unauthenticatedNavBar = () => {
    return (
      <nav id="navBar">
        <div id="logo">
          <img id="globeChatsLogo" src={logo} alt={"GlobeChats logo"} />
          <span id="logoName">GlobeChats</span>
        </div>
        <div id="account-wrapper">
          <Login />
        </div>
      </nav>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <nav id="navBar">
        <div id="logo">
          <img id="globeChatsLogo" src={logo} alt={"GlobeChats logo"} />
          <span id="logoName">GlobeChats</span>
        </div>
        <div id="account-wrapper">
          <ProfileButton />
          <Logout />
        </div>
      </nav>
    );
  };

  return <>{!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}</>;
};

export default NavigationBar;
