import React from "react";
import { GoogleLogout } from "react-google-login";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const handleGoogleLogout = (response) => {
  fetch("/api/users/logout", {
    method: "POST",
  }).then((fetchResponse) => {
    if (fetchResponse.ok) {
      alert("Logged out");
    } else {
      alert("Error logging out", fetchResponse.statusText);
    }
  });
};

const Logout = () => {
  return (
    <div className="nav-item">
      <GoogleLogout clientId={REACT_APP_GOOGLE_CLIENT_ID} buttonText="Logout" onLogoutSuccess={handleGoogleLogout}></GoogleLogout>
    </div>
  );
};

export default Logout;
