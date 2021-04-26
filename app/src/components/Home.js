import React, { useState, createContext, useContext, useEffect, Suspense } from "react";
import Chatroom from "./Chatroom";
import FriendsList from "./FriendsList";
import ProfileButton from "./ProfileButton";
import CreateButtons from "./CreateButtons";
import Map from "./Map";
import UnauthenticatedMap from "./UnauthenticatedMap";
import ProfileContextTest from "./ProfileContextTest";
import ProfileAtomTest from "./ProfileAtomTest";
import { AuthContext } from "../contexts/AuthContext";
import ProfileProvider from "../contexts/ProfileContext";
import ChatroomProvider from "../contexts/ChatroomContext";
import ChatProvider from "../contexts/ChatContext";
import Profile from "./Profile";

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
      <div id="homeTest">
          {/* <UnauthenticatedMap /> */}
          {/* <ProfileProvider>
            <ProfileContextTest />
          </ProfileProvider> */}
          <ProfileAtomTest />
       </div>
     </>
  );
};

export default Home;
