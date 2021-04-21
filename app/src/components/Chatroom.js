import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { ChatroomContext } from "../contexts/ChatroomContext";
import { ChatContext } from "../contexts/ChatContext";
import moment from "moment-timezone";
import profileIcon from "../assets/5.png";

function Chatroom(props) {
  const { user, isAuthenticated } = useContext(AuthContext);
  const { profiles } = useContext(ProfileContext);
  const { chatrooms, setChatrooms } = useContext(ChatroomContext);
  const { chats, setChats } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [tabSelect, setTabSelect] = useState(0);
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  console.log(profiles);
  var imgStyle = {
    borderRadius: "20px",
  };

  useEffect(() => {
    if (document.getElementById("chatMessages")) {
      var elem = document.getElementById("chatMessages");
      elem.scrollTop = elem.scrollHeight;
    }
  }, [tabSelect, chats, chatrooms, message]);

  const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };
  const displayChats = (chatroom_id) => {
    const filteredChats = chats.filter((chat) => {
      return chat.chatroomId == chatroom_id;
    });

    return filteredChats.map((chat, i) => {
      const { userId, message, timestamp } = chat;
      let profile = findProfile(userId);

      return (
        <div className="chatBlock">
          <div className="chatMessage">
            <div className="chatProfile">
              <span>
                <img src={profile.googleImg} style={imgStyle} alt="profileIcon" width="25" />
                &nbsp;
              </span>
              <span className="profileName">
                {profile.firstName} {profile.lastName[0]}.
              </span>
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

  const findProfile = (id) => {
    var tempProfile = {
      user: "",
      message: "",
    };
    profiles.forEach((profile) => {
      if (profile._id === id) {
        tempProfile = {
          firstName: profile.firstName,
          lastName: profile.lastName,
          googleImg: profile.googleImg,
        };
      }
    });
    return tempProfile;
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

    axios
      .post("/api/chats/add", chatPacket)
      .then((res) => {
        setChats((currentChats) => [...currentChats, chatPacket]);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("setTitle");
    setTitle(
      chatrooms.map((chatroom) => {
        return <Tab key={chatroom._id}>{chatroom.name}</Tab>;
      })
    );
  }, [chatrooms]);

  return (
    <div class="chatroom-window-container">
      <div class="chatroom-window-header">
        <div class="chatroom-window-header-middle">Chatroom</div>
      </div>
      <Tabs
        defaultIndex={tabSelect}
        onSelect={(tabSelect) => {
          setTabSelect(tabSelect);
        }}
      >
        <TabList>{title}</TabList>
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
