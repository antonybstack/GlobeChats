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
import { useQuery, useMutation } from "react-query";

function Chatroom(props) {
  //const { user, isAuthenticated } = useContext(AuthContext);
  const [user, setUser] = useAtom(userAtom);
  //const { profiles } = useContext(ProfileContext);
  //const [chatrooms] = useAtom(chatroomsAtom);
  const [setChats] = useAtom(chatsAtom);
  //const { chats, setChats } = useContext(ChatContext);
  const [message, setMessage] = useState("");
  const [tabSelect, setTabSelect] = useState(0);

  const leaveChatroomMutation = useMutation((leavingChatroom) => axios.put("/api/users/leavechatroom/" + user._id, leavingChatroom), {
    onSuccess: async (data) => {
      setUser(data.data.user);
    },
  });

  const chatroomsQuery = useQuery(
    ["chatrooms", user],
    () => {
      return axios
        .get("/api/chatrooms/joined/" + user.joinedChatroomIds)
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    },
    {
      // The query will not execute until the userId exists
      enabled: !!user,
    }
  );

  useEffect(() => {
    if (document.getElementById("chatMessages")) {
      var elem = document.getElementById("chatMessages");
      elem.scrollTop = elem.scrollHeight;
    }
  }, [tabSelect, message, user]);

  // var chatrooms = [];
  // if (data) {
  //   chatrooms = data.chatrooms;
  // }

  var imgStyle = {
    borderRadius: "20px",
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
      .catch((err) => {
        console.log(err);
      });
  };

  const closeTab = (e) => {
    leaveChatroomMutation.mutate({ chatroom_id: e.target.id });
  };

  // useEffect(() => {
  //   setTitle(
  //     chatrooms.map((chatroom) => {
  //       return (

  //       );
  //     })
  //   );
  // }, [chatrooms]);
  var chatrooms = [];
  if (chatroomsQuery.data) chatrooms = chatroomsQuery.data.chatrooms;

  return (
    <>
      {chatroomsQuery.status === "loading" ? (
        <div>Loading chatrooms... </div>
      ) : (
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
            <TabList>
              {chatroomsQuery.data
                ? chatroomsQuery.data.chatrooms.map((chatroom) => {
                    return (
                      <Tab key={chatroom._id}>
                        {chatroom.name}&nbsp;
                        <div key={chatroom._id} id={chatroom._id} onClick={closeTab} className="tabCloseButton">
                          x
                        </div>
                      </Tab>
                    );
                  })
                : null}
            </TabList>
            {chatroomsQuery.data
              ? chatrooms.map((chatroom) => {
                  return (
                    <TabPanel>
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
                  );
                })
              : null}
          </Tabs>

          {/* <div class="chatroom-container">{displayChats()}</div> */}
        </div>
      )}
    </>
  );
}

export default Chatroom;
