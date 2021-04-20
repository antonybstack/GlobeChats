import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { ChatContext } from "../contexts/ChatContext";
import Chat from "./Chat";
import moment from "moment-timezone";

function Chatroom(props) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chats, setChats } = useContext(ChatContext);
  const [message, setMessage] = useState("");

  console.log({ chats });
  const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
  const displayChats = () => {
    return chats.map((currentData, i) => {
      console.log(currentData);
      const { userId, message, timestamp } = currentData;
      return (
        <div className="chatBlock">
          <div className="chatMessage">
            <div className="msgContainer">
              <div className="chatUserId">{userId}</div>
              &nbsp;
              <div className="chatMessage">{message}</div>
              &nbsp;
              <div className="chatTime">
                {new Date(timestamp).toLocaleDateString("en-US", DATE_OPTIONS)}
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // if user clicks enter, it sends chat. If shift+enter, does not send (next line)
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.shiftKey === false) {
      send(event);
    }
  };

  const send = (e) => {
    e.preventDefault();
    let date = moment().tz("America/New_York");
    let chatPacket = {
      userId: user._id,
      chatroomId: "60799aba0a36b521ac90b19f",
      message: message,
      timestamp: date,
    };
    console.log(chatPacket);

    axios
      .post("/api/chats/add", chatPacket)
      .then((res) => {
        console.log("success!");
        setChats((currentChats) => [
          ...currentChats,
          {
            userId: user._id,
            chatroomId: "60799aba0a36b521ac90b19f",
            message: message,
            timestamp: date,
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
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
      <div className="chatbar">
        <textarea
          id="textarea"
          className="chatinput"
          type="textarea"
          name="message"
          placeholder="Your Message Here"
          wrap="hard"
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button className="chatSend" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatroom;
