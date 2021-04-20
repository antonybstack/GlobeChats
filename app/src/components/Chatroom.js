import React, { useEffect, useContext, useState, Component } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { AuthContext } from "../contexts/AuthContext";
import { ChatroomContext } from "../contexts/ChatroomContext";
import { ChatContext } from "../contexts/ChatContext";
import Chat from "./Chat";
import moment from "moment-timezone";
import profileIcon from "../assets/5.png";

function Chatroom(props) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { chatrooms, setChatrooms } = useContext(ChatroomContext);
  const { chats, setChats } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [tabSelect, setTabSelect] = useState(0);
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  useEffect(() => {
    setTitle(
      chatrooms.map((chatroom) => {
        return <Tab key={chatroom.name}>{chatroom.name}</Tab>;
      })
    );
    setText();
  }, [setChatrooms]);

  useEffect(() => {
    if (document.getElementById("chatMessages")) {
      var elem = document.getElementById("chatMessages");
      elem.scrollTop = elem.scrollHeight;
    }
  }, [tabSelect, chats, chatrooms, message]);

  console.log(user);
  console.log(chatrooms);
  console.log(chats);

  const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
  const displayChats = (chatroom_id) => {
    const filteredChats = chats.filter((chat) => {
      return chat.chatroomId == chatroom_id;
    });

    return filteredChats.map((chat, i) => {
      const { userId, message, timestamp } = chat;
      return (
        <div className="chatBlock">
          <div className="chatMessage">
            <div className="chatProfile">
              <span>
                <img src={profileIcon} alt="profileIcon" width="20" />
                &nbsp;
              </span>
              <span>{userId}</span>
            </div>
            <div className="msgContainer">{message}</div>
          </div>
          <div className="chatTime">
            {new Date(timestamp).toLocaleTimeString("en-US")}&nbsp;&nbsp;
            {new Date(timestamp).toLocaleDateString("en-US", DATE_OPTIONS)}
          </div>
        </div>
      );
    });
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // const hideChatroom = (e) => {
  //   var elem = document.getElementsByClassName("chatroom-window-container")[0];
  //   if (elem) elem.style.top = "119.6%";
  // };

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
      chatroomId: chatrooms[tabSelect]._id,
      message: message,
      timestamp: date,
    };
    console.log(chatPacket);

    axios
      .post("/api/chats/add", chatPacket)
      .then((res) => {
        console.log("success!");
        setChats((currentChats) => [...currentChats, chatPacket]);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="chatroom-window-container">
      <div class="chatroom-window-header">
        <div class="chatroom-window-header-middle">Chatroom</div>
      </div>
      <Tabs
        defaultIndex={tabSelect}
        onSelect={(tabSelect) => {
          console.log(tabSelect);
          setTabSelect(tabSelect);
        }}
      >
        <TabList>
          {chatrooms.map((chatroom) => (
            <Tab key={chatroom._id}>{chatroom.name}</Tab>
          ))}
        </TabList>
        {chatrooms.map((chatroom) => (
          <TabPanel key={chatroom._id}>
            <div className="chat">
              <div className="chatroom">
                <div className="chatContainer">
                  <div id="chatMessages" className="chatMessages">
                    {displayChats(chatroom._id)}
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
              </div>
            </div>
          </TabPanel>
        ))}
      </Tabs>
      {/* <div class="chatroom-container">{displayChats()}</div> */}
    </div>
  );
}

export default Chatroom;
