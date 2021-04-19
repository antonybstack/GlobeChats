/* eslint-disable import/no-anonymous-default-export */
import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ChatroomContext } from "../contexts/ChatroomContext";

import axios from "axios";

export const ChatContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const { user,  isAuthenticated } = useContext(AuthContext);
  const { chatrooms, setChatrooms, chatroomsLoaded } = useContext(ChatroomContext);
  const [chats, setChats] = useState([]);
  const [chatsLoaded, setChatsLoaded] = useState(false);
  useEffect(() => {
    setChatsLoaded(false);
    console.log(isAuthenticated);
    console.log(chatroomsLoaded);
    if(isAuthenticated && chatroomsLoaded){
      console.log(chatrooms);
      setChats([]);
      const getChats = async () => {
        
          setChatrooms([]);
          chatrooms.forEach(async chatroom => {
            console.log(chatroom);
            await axios.get("/api/chats/chatroom/"+chatroom._id).then((res) => {
              console.log(res.data.chats);
              if(res.data.chats) setChats((currentChats) => [...currentChats, res.data.chats]);
            });
          });
        
      };
      const load = async () => {
        await getChats();
        setChatsLoaded(true);
      };

      load();
    }
    //rerenders when user logs in and user updates so that it notifies that the user has joined the chatroom
  }, [chatroomsLoaded]);

  // provider passes context to all children compoents, no matter how deep it is
  return <ChatContext.Provider value={{ chats, setChats }}>{children}</ChatContext.Provider>;
};
