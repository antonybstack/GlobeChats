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
  const [globalChatroomsLoaded, setGlobalChatroomsLoaded] = useState(false);

  useEffect(() => {
    setChatroomsLoaded(false);
    if (isAuthenticated) {
      const getChatrooms = async () => {
        setChatrooms([]);
        if (user.joinedChatroomIds) {
          user.joinedChatroomIds.forEach(async (chatroomId) => {
            if (chatroomId) {
              await axios
                .get("/api/chatrooms/" + chatroomId)
                .then((res) => {
                  if (res.data.chatroom) setChatrooms((currentChatrooms) => [...currentChatrooms, res.data.chatroom]);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          });
        }
      };

      const getGlobalChatrooms = async () => {
        setGlobalChatrooms([]);
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
        // while (!globalChatroomsLoaded) {
        //   if (globalChatrooms.length == 0) {
        //     setGlobalChatroomsLoaded(false);
        //   } else {
        //     setGlobalChatroomsLoaded(true);
        //   }
        // }

        // function myLoop() {
        //   //  create a loop function
        //   setTimeout(function () {
        //     //  call a 3s setTimeout when the loop is called
        //     if (globalChatrooms.length > 0) {
        //       setGlobalChatroomsLoaded(true);
        //     }
        //     if (!globalChatroomsLoaded) {
        //       //  if the counter < 10, call the loop function
        //       myLoop(); //  ..  again which will trigger another
        //     } //  ..  setTimeout()
        //   }, 250);
        // }

        // myLoop();
        setGlobalChatroomsLoaded(true);
        await getChatrooms();
        setChatroomsLoaded(true);
      };

      load();
    }
    //rerenders when user logs in and user updates so that it notifies that the user has joined the chatroom
  }, [user]);

  // provider passes context to all children compoents, no matter how deep it is
  return <ChatroomContext.Provider value={{ chatrooms, setChatrooms, globalChatrooms, setGlobalChatrooms, chatroomsLoaded, globalChatroomsLoaded }}>{children}</ChatroomContext.Provider>;
};
