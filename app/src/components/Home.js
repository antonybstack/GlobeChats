import React, { useState, createContext, useContext, useEffect } from "react";
import Login from "./Login";
import Logout from "./Logout";
import Chatroom from "./Chatroom";
import FriendsList from "./FriendsList";
import ProfileButton from "./ProfileButton";
import CreateEvent from "./CreateEvent";
import CreateButtons from "./CreateButtons";
import Map from "./Map";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { user, isAuthenticated, authLoaded } = useContext(AuthContext);
  const friend = [
    { id: 1, name: "Roderick" },
    { id: 2, name: "Matt" },
    { id: 3, name: "Antony" },
    { id: 4, name: "Josh" },
    { id: 5, name: "Tony" },
    { id: 6, name: "Anna" },
  ];

  return (
    <>
      {isAuthenticated ? (
        <div className="home">
          <ProfileButton />
          <Chatroom />
          <CreateButtons />
          <FriendsList friend={friend} />
          <Map />
        </div>
      ) : (
        <div className="home">
          <Map />
        </div>
      )}
    </>
  );
};

export default Home;
