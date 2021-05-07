import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated, fetchUserAtom, fetchSocketAtom, socketAtom, connectedUsersAtom } from "../atoms/AtomHelpers";
import axios from "axios";
import LoginConfirmation from "./LoginConfirmation";
import { Modal, Form, Input, Button, Switch, message, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Login = () => {
  const [, setUser] = useAtom(userAtom);
  const [, fetchUser] = useAtom(fetchUserAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isUserAuthenticated);
  const [socket] = useAtom(socketAtom);
  const [, setConnectedUsers] = useAtom(connectedUsersAtom);
  const [googlePayload, setGooglePayload] = useState(null);
  const [loginConfirmed, setLoginConfirmed] = useState(false);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [loginBtnText, setLoginBtnText] = useState("Sign in with Google");

  // const handleGoogleLogin = (response) => {
  //   alert(1);
  //   axios
  //     .post("/api/users/login", null, {
  //       headers: {
  //         Authorization: `Bearer ${response.tokenId}`,
  //       },
  //     })
  //     .then((res) => {
  //       const { isAuthenticated, user } = res.data;
  //       socket.emit("authenticated user", user);
  //       socket.on("authenticated user", (connections) => {
  //         setConnectedUsers(connections);
  //       });
  //       fetchUser();
  //       message.success("Successfully logged in");
  //     })
  //     .catch(function () {
  //       message.error("Error logging into your Google account");
  //     });
  // };

  useEffect(() => {
    //console.log(googlePayload);
    if (loginConfirmed && !isAuthenticated) {
      axios
        .post("/api/users/login", null, {
          headers: {
            Authorization: `Bearer ${googlePayload.tokenId}`,
          },
        })
        .then((res) => {
          const { isAuthenticated, user } = res.data;
          socket.emit("authenticated user", user);
          socket.on("authenticated user", (connections) => {
            setConnectedUsers(connections);
          });
          fetchUser();
          message.success("Successfully logged in");
        })
        .catch(function () {
          message.error("Error logging into your Google account");
        });
    }
  }, [loginConfirmed]);

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const toggleLoginConfirmationModal = (response) => {
    setGooglePayload(response);
    //console.log(getCookie("captcha"));
    if (getCookie("captcha") === "authenticated") setLoginConfirmed(true);
    else setModalVisibility(true);
  };

  const handleGoogleFailure = (response) => {
    message.error("Error logging into your Google account");
  };

  return (
    <div id="GoogleLogin" className="nav-item">
      <Space />
      <GoogleLogin
        clientId={REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={
          !modalVisibility ? (
            "Sign in with Google"
          ) : (
            <div className="loadingSpinner">
              <Spin />
              &nbsp;&nbsp;Loading
            </div>
          )
        }
        icon={!modalVisibility ? true : false}
        onSuccess={toggleLoginConfirmationModal}
        onFailure={handleGoogleFailure}
        //cookiePolicy={"single_host_origin"}
        isSignedIn={false}
      />
      <LoginConfirmation loginConfirmed={loginConfirmed} setLoginConfirmed={setLoginConfirmed} modalVisibility={modalVisibility} setModalVisibility={setModalVisibility} />
    </div>
  );
};

export default Login;
