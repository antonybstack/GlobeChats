/* eslint-disable import/no-anonymous-default-export */
import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import axios from "axios";

export const ChatroomContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const { user, isAuthenticated, authLoaded } = useContext(AuthContext);
  const [chatrooms, setChatrooms] = useState([]);
  const [globalChatrooms, setGlobalChatrooms] = useState([]);
  const [chatroomsLoaded, setChatroomsLoaded] = useState(false);

  useEffect(() => {
    setChatroomsLoaded(false);
    if (isAuthenticated) {
      setChatrooms([]);
      const getChatrooms = async () => {
        if (user.joinedChatroomIds) {
          user.joinedChatroomIds.forEach(async (chatroomId) => {
            await axios
              .get("/api/chatrooms/" + chatroomId)
              .then((res) => {
                if (res.data.chatroom) setChatrooms((currentChatrooms) => [...currentChatrooms, res.data.chatroom]);
              })
              .catch((err) => {
                console.log(err);
              });
          });
        }
      };

      setGlobalChatrooms([]);
      const getGlobalChatrooms = async () => {
        await axios
          .get("/api/chatrooms/")
          .then((res) => {
            if (res.data.chatrooms) setGlobalChatrooms(res.data.chatrooms);
          })
          .catch((err) => {
            console.log(err);
          });
      };

      const load = async () => {
        await getGlobalChatrooms();
        await getChatrooms();
        setChatroomsLoaded(true);
      };

      load();
    }
    //rerenders when user logs in and user updates so that it notifies that the user has joined the chatroom
  }, [authLoaded]);

  // provider passes context to all children compoents, no matter how deep it is
  return <>{!setChatroomsLoaded ? null : <ChatroomContext.Provider value={{ chatrooms, setChatrooms, globalChatrooms, setGlobalChatrooms, chatroomsLoaded }}>{children}</ChatroomContext.Provider>}</>;
};
