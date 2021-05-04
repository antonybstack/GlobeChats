import React from "react";
import { GoogleLogin } from "react-google-login";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated, fetchUserAtom } from "../atoms/AtomHelpers";
import axios from "axios";
import { Space, message } from "antd";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Login = () => {
  const [, setUser] = useAtom(userAtom);
  const [, fetchUser] = useAtom(fetchUserAtom);
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
        fetchUser();
        // setUser(user);
        // setIsAuthenticated(isAuthenticated);
        // window.location.reload();

        message.success("Successfully logged in");
      })
      .catch(function () {});
  };

  const handleGoogleFailure = (response) => {
    alert("error logging into your Google account");
  };

  return (
    <div id="GoogleLogin" className="nav-item">
      <Space />
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
