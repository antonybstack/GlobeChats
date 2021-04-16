import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import Chat from "./Chat";

function Chatroom(props) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  console.log({ chats });
  const DATE_OPTIONS = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
  const displayChats = () => {
    return chats.map((currentData, i) => {
      console.log(currentData);
      const { userId, message, timestamp } = currentData;
      return (
        <div className="chatBlock">
          <div className="chatMessage">
            <span className="msgContainer">
              {userId}: {message}
            </span>
          </div>
          <div className="chatTime">{new Date(timestamp).toLocaleDateString("en-US", DATE_OPTIONS)}</div>
        </div>
      );
    });
  };

  return (
    <div class="event-create-container">
      <div class="event-header">
        <div class="event-header-middle">Chatroom</div>
        <div class="event-close-outside" onClick={props.handleClose}>
          <div class="event-close-x-left">
            <div class="event-close-x-right"></div>
          </div>
        </div>
      </div>
      <div class="chatroom-container">
        {displayChats()}
        {/* {chats.map((currentChat) => {
          return <Chat chat={currentChat} />;
        })} */}
      </div>
    </div>
  );
}

export default Chatroom;
