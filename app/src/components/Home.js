import React, { useState, createContext, useContext, useEffect } from "react";
import Chatroom from "./Chatroom";
import FriendsList from "./FriendsList";
import ProfileButton from "./ProfileButton";
import CreateButtons from "./CreateButtons";
import Map from "./Map";
import { AuthContext } from "../contexts/AuthContext";
import ChatroomProvider from "../contexts/ChatroomContext";
import ChatProvider from "../contexts/ChatContext";

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
          <ChatroomProvider>
            <ChatProvider>
              <ProfileButton />
              <Chatroom />
              <CreateButtons />
              <FriendsList friend={friend} />
              <Map />
            </ChatProvider>
          </ChatroomProvider>
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
