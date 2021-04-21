/* eslint-disable import/no-anonymous-default-export */
import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatroomContext } from "../contexts/ChatroomContext";

import axios from "axios";

export const ChatContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chatrooms, setChatrooms, chatroomsLoaded } = useContext(ChatroomContext);
  const [chats, setChats] = useState([]);
  const [chatsLoaded, setChatsLoaded] = useState(false);
  useEffect(() => {
    setChatsLoaded(false);
    if (isAuthenticated && user.joinedChatroomIds) {
      setChats([]);
      const getChats = async () => {
        setChatrooms([]);
        user.joinedChatroomIds.forEach(async (chatroomId) => {
          if (chatroomId) {
            await axios
              .get("/api/chats/chatroom/" + chatroomId)
              .then((res) => {
                res.data.chats.forEach((chat) => {
                  if (chat) setChats((currentChats) => [...currentChats, chat]);
                });
                //if (res.data.chats) setChats((currentChats) => [...currentChats, res.data.chats]);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        });
      };
      const load = async () => {
        await getChats();
        setChatsLoaded(true);
      };

      load();
    }
    //rerenders when user logs in and user updates so that it notifies that the user has joined the chatroom
  }, [isAuthenticated]);

  // provider passes context to all children compoents, no matter how deep it is
  return <ChatContext.Provider value={{ chats, setChats }}>{children}</ChatContext.Provider>;
};
