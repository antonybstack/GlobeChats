import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated, failedToAuthenticateAtom, fetchUserAtom, socketAtom, connectedUsersAtom } from "../atoms/AtomHelpers";
import axios from "axios";
import { Space, message } from "antd";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Logout = () => {
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isUserAuthenticated);
  const [failedToAuthenticate, setFailedToAuthenticate] = useAtom(failedToAuthenticateAtom);
  const [, fetchUser] = useAtom(fetchUserAtom);
  const [socket] = useAtom(socketAtom);
  const [, setConnectedUsers] = useAtom(connectedUsersAtom);

  useEffect(() => {
    if (isAuthenticated) {
      socket.emit("authenticated user", user);
      socket.on("authenticated user", (connections) => {
        setConnectedUsers(connections);
      });
    }
    socket.on("logout user", (connections) => {
      console.log(connections);
      setConnectedUsers(connections);
    });

    socket.on("disconnected", (connections) => {
      console.log(connections);
      setConnectedUsers(connections);
    });
  }, [isAuthenticated]);

  const handleGoogleLogout = () => {
    axios
      .post("/api/users/logout", null, {})
      .then((res) => {
        const { user } = res.data;
        socket.emit("logout user");
        socket.on("logout user", (connections) => {
          console.log(connections);
          setConnectedUsers(connections);
        });
        setFailedToAuthenticate(true);
        // socket.disconnect();
        // setUser(user);
        // setIsAuthenticated(false);
        // window.location.reload();
        setUser({});
        setIsAuthenticated(false);
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
