/* eslint-disable import/no-anonymous-default-export */
import React, { useState, createContext, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

import axios from "axios";

export const ChatContext = createContext(); //creating Context object with empty object

export default ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [chats, setChats] = useState([]);

  console.log("sdfdddddddddddddddd");
  useEffect(() => {
    const getChats = async () => {
      setChats([]);
      await axios.get("/api/chats").then((res) => {
        console.log(res.data);
        let temp = res.data;
        temp.forEach((currentData) => {
          setChats((currentChats) => [...currentChats, currentData]);
        });
      });
    };
    getChats();

    //rerenders when user logs in and user updates so that it notifies that the user has joined the chatroom
  }, []);

  // provider passes context to all children compoents, no matter how deep it is
  return <ChatContext.Provider value={{ chats, setChats }}>{children}</ChatContext.Provider>;
};
