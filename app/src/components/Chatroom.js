import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useAtom } from "jotai";
import { userAtom, loading, socketAtom } from "../atoms/AtomHelpers";
// import { chatsAtom, fetchChatsAtom } from "../atoms/ChatAtom";
import Chats from "./Chats";
import moment from "moment-timezone";
import { useQuery, useMutation, useQueryClient } from "react-query";
import MembersList from "./MembersList";
import { CloseCircleFilled } from "@ant-design/icons";
import { Popconfirm } from "antd";

function Chatroom(props) {
  const [user, setUser] = useAtom(userAtom);
  const [isAdminOfCurrentChatroom, setIsAdminOfCurrentChatroom] = useState(false);
  const [currentTab, setCurrentChatroomTab] = useState("");
  const [message, setMessage] = useState("");
  const [tabSelect, setTabSelect] = useState(0);
  const [, setIsLoading] = useAtom(loading);
  const [socket] = useAtom(socketAtom);

  const queryClient = useQueryClient();

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

  const leaveChatroomMutation = useMutation((leavingChatroom) => axios.put("/api/users/leavechatroom/" + user._id, leavingChatroom), {
    onSuccess: async (data) => {
      setUser(data.data.user);
    },
  });

  const changeCurrentTab = (key) => {
    setCurrentChatroomTab(key);
  };

  useEffect(() => {
    if (document.getElementById("chatMessages")) {
      var elem = document.getElementById("chatMessages");
      elem.scrollTop = elem.scrollHeight;
    }
  }, [tabSelect, user]);

  useEffect(() => {
    setCurrentChatroomTab(user.joinedChatroomIds[0]);
  }, []);

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
    if (message.length > 0) {
      let chatPacket = {
        userId: user._id,
        chatroomId: chatroomsQuery.data.chatrooms[tabSelect]._id,
        message: message,
        timestamp: date,
      };
      // chat sent to socket.io, socket.io adds to database
      // database returns encrypted chat packet
      // it is decrypted and then emitted back to client
      socket.emit("chat message", chatPacket);
    }

    setMessage("");
  };

  const closeTab = (chatroom_id) => {
    console.log(chatroom_id);
    leaveChatroomMutation.mutate({ chatroom_id: chatroom_id });
  };

  useEffect(() => {
    if (chatroomsQuery.status === "loading") setIsLoading(true);
    else setIsLoading(false);
  }, [chatroomsQuery.status]);

  useEffect(() => {
    user.joinedChatroomIds.forEach((chatroomId) => {
      if (chatroomId === currentTab) setIsAdminOfCurrentChatroom(true);
    });
  }, [currentTab, user.joinedChatroomIds]);

  //sets as Admin if current user is an admin of the chatroom
  useEffect(() => {
    if (chatroomsQuery && chatroomsQuery.data && chatroomsQuery.data.chatrooms) {
      let currentTabChatroom = chatroomsQuery.data.chatrooms.find((chatroom) => {
        return chatroom._id === currentTab;
      });
      if (currentTabChatroom) {
        if (currentTabChatroom.adminId === user._id) setIsAdminOfCurrentChatroom(true);
        else setIsAdminOfCurrentChatroom(false);
      }
    }
  }, [currentTab, chatroomsQuery.data]);

  return (
    <>
      {chatroomsQuery.status === "loading" ? (
        <div className="chatroom-window-container">
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
                      <Tab>
                        loading...&nbsp;
                        <CloseCircleFilled style={{ fontSize: ".9em", padding: ".25em", paddingLeft: ".5em", color: "#a0a0a0" }} />
                      </Tab>
                    );
                  })
                : null}
            </TabList>

            <TabPanel>
              <div className="chat">
                <div id="chatMessages" className="chatMessages"></div>
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
                  <button className="chatSend">Send</button>
                </div>
              </div>
              <MembersList props={{ isAdminOfCurrentChatroom: false, chatroom: null }} />
            </TabPanel>
          </Tabs>
        </div>
      ) : (
        <div className="chatroom-window-container">
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
                      <Tab onClick={() => changeCurrentTab(chatroom._id)} key={chatroom._id} id={chatroom._id}>
                        {chatroom.name}&nbsp;
                        <Popconfirm title="Are you sure you want to leave this chatroom?" onConfirm={() => closeTab(chatroom._id)} okText="Yes" cancelText="No">
                          <CloseCircleFilled style={{ fontSize: ".9em", padding: ".25em", paddingLeft: ".5em", color: "#a0a0a0" }} />
                        </Popconfirm>
                      </Tab>
                    );
                  })
                : null}
            </TabList>
            {chatroomsQuery.data
              ? chatroomsQuery.data.chatrooms.map((chatroom) => {
                  return (
                    <TabPanel key={chatroom._id}>
                      <div className="chat">
                        <div id="chatMessages" className="chatMessages">
                          <Chats props={{ isAdminOfCurrentChatroom: isAdminOfCurrentChatroom, chatroom_id: chatroom._id }} />
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
                      <MembersList props={{ isAdminOfCurrentChatroom, chatroom }} />
                    </TabPanel>
                  );
                })
              : null}
          </Tabs>
        </div>
      )}
    </>
  );
}

export default Chatroom;
