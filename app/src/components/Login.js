import React from "react";
import { GoogleLogin } from "react-google-login";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const handleGoogleLogin = (response) => {
  fetch("/api/users/login", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${response.tokenId}`,
    },
  }).then((fetchResponse) => {
    if (!fetchResponse.ok) {
      alert("Unable to authenticate", fetchResponse.statusText);
    } else {
      alert("Logged in");
    }
  });
};

const handleGoogleFailure = (response) => {
  alert("error logging into your Google account");
};

const Login = () => {
  return (
    <div className="nav-item">
      <GoogleLogin
        style={{ color: "red" }}
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleFailure}
        //cookiePolicy={"single_host_origin"}
        isSignedIn
      />
    </div>
  );
};

export default Login;
