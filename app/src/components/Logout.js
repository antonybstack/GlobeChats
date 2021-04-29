import React from "react";
import { GoogleLogout } from "react-google-login";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated } from "../atoms/AuthAtom";
import axios from "axios";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Logout = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setIsAuthenticated] = useAtom(isUserAuthenticated);

  const handleGoogleLogout = () => {
    axios
      .post("/api/users/logout", null, {})
      .then((res) => {
        const { user } = res.data;
        setUser(user);
        setIsAuthenticated(false);
        window.location.reload();
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
