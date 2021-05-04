import React from "react";
import { GoogleLogout } from "react-google-login";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated, fetchUserAtom } from "../atoms/AtomHelpers";
import axios from "axios";
import { Space, message } from "antd";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Logout = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setIsAuthenticated] = useAtom(isUserAuthenticated);
  const [, fetchUser] = useAtom(fetchUserAtom);

  const handleGoogleLogout = () => {
    axios
      .post("/api/users/logout", null, {})
      .then((res) => {
        const { user } = res.data;
        // setUser(user);
        // setIsAuthenticated(false);
        // window.location.reload();
        fetchUser();
        message.success("Successfully logged out");
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  return (
    <div id="GoogleLogin" className="nav-item">
      <Space />
      <GoogleLogout clientId={REACT_APP_GOOGLE_CLIENT_ID} buttonText="Logout" onLogoutSuccess={handleGoogleLogout}></GoogleLogout>
    </div>
  );
};

export default Logout;
