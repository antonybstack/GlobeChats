import React from "react";
import { GoogleLogin } from "react-google-login";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated, fetchUserAtom, fetchSocketAtom, socketAtom, connectedUsersAtom } from "../atoms/AtomHelpers";
import axios from "axios";
import { Space, message } from "antd";
const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Login = () => {
  const [, setUser] = useAtom(userAtom);
  const [, fetchUser] = useAtom(fetchUserAtom);
  const [, setIsAuthenticated] = useAtom(isUserAuthenticated);
  const [socket] = useAtom(socketAtom);
  const [, setConnectedUsers] = useAtom(connectedUsersAtom);

  const handleGoogleLogin = (response) => {
    axios
      .post("/api/users/login", null, {
        headers: {
          Authorization: `Bearer ${response.tokenId}`,
        },
      })
      .then((res) => {
        const { isAuthenticated, user } = res.data;
        socket.emit("authenticated user", user);
        socket.on("authenticated user", (connections) => {
          setConnectedUsers(connections);
        });
        fetchUser();
        // console.log(user);
        // const authenticatedUser = {
        //   socketid: socket.id,
        //   _id: user._id,
        //   firstName: user.firstName,
        //   lastName: user.lastName,
        //   joinedChatroomIds: user.joinedChatroomIds,
        //   friendlist: user.friendlist,
        //   email: user.email,
        //   googleImg: user.googleImg,
        // };

        // console.log(authenticatedUser);

        // socket.emit("authenticated user", authenticatedUser);
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

  const test = (response) => {
    alert(response);
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
        isSignedIn={true}
      />
    </div>
  );
};

export default Login;
