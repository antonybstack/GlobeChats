import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { AuthContext } from "../contexts/AuthContext";
import { useAtom } from "jotai";
import { userAtom, fetchUserAtom, isUserAuthenticated } from "../atoms/AuthAtom";
import { ProfileContext } from "../contexts/ProfileContext";
import { profilesAtom, fetchProfilesAtom } from "../atoms/ProfileAtom";
import { ChatroomContext } from "../contexts/ChatroomContext";
import { chatroomsAtom, fetchChatroomsAtom, chatroomsLoadedAtom } from "../atoms/ChatroomAtom";
import { ChatContext } from "../contexts/ChatContext";
import { chatsAtom, fetchChatsAtom } from "../atoms/ChatAtom";
import Chats from "./Chats";
import moment from "moment-timezone";
import profileIcon from "../assets/5.png";

function Chatroom(props) {
  //const { user, isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isUserAuthenticated);
  const [, fetchUser] = useAtom(fetchUserAtom);
  //const { profiles } = useContext(ProfileContext);
  const [profiles] = useAtom(profilesAtom);
  const [chatrooms, setChatrooms] = useAtom(chatroomsAtom);
  const [, fetchChatrooms] = useAtom(fetchChatroomsAtom);
  const [chatroomsLoaded] = useAtom(chatroomsLoadedAtom);
  //const { chats, setChats } = useContext(ChatContext);
  const [chats, setChats] = useAtom(chatsAtom);
  const [, fetchChats] = useAtom(fetchChatsAtom);
  const [message, setMessage] = useState("");
  const [tabSelect, setTabSelect] = useState(0);
  const [title, setTitle] = useState();
  const [text, setText] = useState();

  console.log(chatrooms);

  var imgStyle = {
    borderRadius: "20px",
  };

  useEffect(() => {
    if (document.getElementById("chatMessages")) {
      var elem = document.getElementById("chatMessages");
      elem.scrollTop = elem.scrollHeight;
    }
  }, [tabSelect, chatrooms, message, user]);

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
      .catch((err) => {
        console.log(err);
      });
  };

  const closeTab = (e) => {
    axios
      .put("/api/users/leavechatroom/" + user._id, { chatroom_id: e.target.id })
      .then((res) => {
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   setTitle(
  //     chatrooms.map((chatroom) => {
  //       return (

  //       );
  //     })
  //   );
  // }, [chatrooms]);

  return (
    <div className="chatroom-window-container">
      <div className="chatroom-window-header">
        <div className="chatroom-window-header-middle">Chatroom</div>
      </div>
      <Tabs
        defaultIndex={tabSelect}
        onSelect={(tabSelect) => {
          setTabSelect(tabSelect);
        }}
      >
        {chatrooms
          ? chatrooms.map((chatroom) => (
              <>
                <TabList>
                  <Tab key={chatroom._id}>
                    {chatroom.name}&nbsp;
                    <div key={chatroom._id} id={chatroom._id} onClick={closeTab} className="tabCloseButton">
                      x
                    </div>
                  </Tab>
                </TabList>
                <TabPanel key={chatroom._id}>
                  <div className="chat">
                    <div className="chatroom">
                      <div className="chatContainer">
                        <div id="chatMessages" className="chatMessages">
                          <Chats chatroom_id={chatroom._id} />
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
              </>
            ))
          : null}
      </Tabs>

      {/* <div class="chatroom-container">{displayChats()}</div> */}
    </div>
  );
}

export default Chatroom;
