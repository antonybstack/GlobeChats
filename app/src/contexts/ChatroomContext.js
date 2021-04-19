/* eslint-disable import/no-anonymous-default-export */
import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext";

import axios from "axios";

export const ChatroomContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const { user, isAuthenticated, authLoaded } = useContext(AuthContext);
  const [chatrooms, setChatrooms] = useState([]);
  const [chatroomsLoaded, setChatroomsLoaded] = useState(false);

  useEffect(() => {
    setChatroomsLoaded(false);
    if(isAuthenticated){
      setChatrooms([]);
      const getChatrooms = async () => {
        if(user.joinedChatroomIds){
          user.joinedChatroomIds.forEach(async chatroomId => {
            console.log(chatroomId);
            await axios.get("/api/chatrooms/"+chatroomId).then((res) => {
              console.log(res.data.chatroom);
              if(res.data.chatroom) setChatrooms((currentChatrooms) => [...currentChatrooms, res.data.chatroom]);
            });
          });
        }
      };

      const load = async () => {
        await getChatrooms();
        setChatroomsLoaded(true);
      };

      load();
      console.log(chatrooms);
    }
    //rerenders when user logs in and user updates so that it notifies that the user has joined the chatroom
  }, [authLoaded]);

  // provider passes context to all children compoents, no matter how deep it is
  return (<>{!setChatroomsLoaded ? null : (<ChatroomContext.Provider value={{ chatrooms, setChatrooms, chatroomsLoaded }}>{children}</ChatroomContext.Provider>)}</>);
};
