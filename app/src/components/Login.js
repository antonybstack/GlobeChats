import React from "react";
import { GoogleLogin } from "react-google-login";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated } from "../atoms/AtomHelpers";
import axios from "axios";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Login = () => {
  const [, setUser] = useAtom(userAtom);
  const [, setIsAuthenticated] = useAtom(isUserAuthenticated);

  const handleGoogleLogin = (response) => {
    axios
      .post("/api/users/login", null, {
        headers: {
          Authorization: `Bearer ${response.tokenId}`,
        },
      })
      .then((res) => {
        const { isAuthenticated, user } = res.data;
        setUser(user);
        setIsAuthenticated(isAuthenticated);
        window.location.reload();
      })
      .catch(function () {});
  };

  const handleGoogleFailure = (response) => {
    alert("error logging into your Google account");
  };

  return (
    <div id="GoogleLogin" className="nav-item">
      <GoogleLogin
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign in with Google"
        onSuccess={handleGoogleLogin}
        onFailure={handleGoogleFailure}
        //cookiePolicy={"single_host_origin"}
        isSignedIn
      />
    </div>
  );
};

export default Login;
