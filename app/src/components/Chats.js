import React, { useEffect, useState } from "react";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import { useAtom } from "jotai";
import { useQuery, queryClient, useQueryClient } from "react-query";
import { isUserAuthenticated, loading, socketAtom } from "../atoms/AtomHelpers";
import unknownUserImage from "../assets/5.png";
import { Popover, Space, message, Button, Modal, Form, Input, Switch } from "antd";
import scrollDown from "scroll-down";

function Chats({ props }) {
  console.log(props);
  const { isAdminOfCurrentChatroom, chatroom_id } = props;
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  const [filteredChats, setFilteredChats] = useState([]);
  // const [intervalMs] = useState(1000);
  const [, setIsLoading] = useAtom(loading);
  const queryClient = useQueryClient();
  const [modalReportVisibility, setModalReportVisibility] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [userToReport, setUserToReport] = useState("");
  const [socket] = useAtom(socketAtom);

  const settingReportMessage = (e) => setReportMessage(e.target.value);

  const chatsQuery = useQuery(
    "chats",
    () => {
      return axios
        .get("/api/chats/")
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    },
    // {
    //   // Refetch the data every second
    //   refetchInterval: intervalMs,
    // },
    {
      // The query will not execute until exists
      enabled: !!isAuthenticated,
    }
  );

  const profilesQuery = useQuery(
    "profiles",
    () => {
      return axios
        .get("/api/users/")
        .then((res) => res.data)
        .catch((err) => {
          console.log(err);
        });
    },
    {
      // The query will not execute until exists
      enabled: !!isAuthenticated,
    }
  );

  useEffect(() => {
    socket.on("chat message", function (msg) {
      if (msg.chatroomId === chatroom_id) {
        setFilteredChats((currentChats) => [...currentChats, msg]);
      }
    });
  }, []);

  var imgStyle = {
    borderRadius: "20px",
  };

  const DATE_OPTIONS = { weekday: "short", month: "short", day: "numeric" };

  const findProfile = (id) => {
    var tempProfile = {
      user: "",
      message: "",
    };
    profilesQuery.data.users.forEach((profile) => {
      if (profile._id === id) {
        tempProfile = {
          _id: profile._id,
          firstName: profile.firstName,
          lastNameInitial: profile.lastName[0].concat("."),
          googleImg: profile.googleImg,
        };
      }
    });

    if (!tempProfile.firstName) {
      tempProfile = {
        _id: "",
        firstName: "unknown",
        lastNameInitial: "",
        googleImg: unknownUserImage,
      };
    }

    return tempProfile;
  };

  useEffect(() => {
    if (chatsQuery) {
      if (chatsQuery.data) {
        if (chatsQuery.data.chats) {
          const temp = chatsQuery.data.chats.filter((chat) => {
            return chat.chatroomId === chatroom_id;
          });
          setFilteredChats(temp);
        }
      }
    }
  }, [chatsQuery.data]);

  useEffect(() => {
    if (document.getElementById("chatMessages")) {
      var elem = document.getElementById("chatMessages");
      console.log(elem);
      elem.scrollTop = elem.scrollHeight;
    }
  }, [filteredChats]);

  useEffect(() => {
    if (chatsQuery.status === "loading" || profilesQuery.status === "loading") setIsLoading(true);
    else setIsLoading(false);
  }, [chatsQuery.status, profilesQuery.status]);

  const removeMessage = (_id) => {
    console.log(_id);
    axios
      .delete("/api/chats/delete/" + _id)
      .then(() => {
        message.success("Message removed from chatroom successfully!");
        return axios
          .get("/api/chats/")
          .then((res) => queryClient.setQueryData("chats", res.data))
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {
        message.error("Error removing message from chatroom.");
      });
  };

  const reportUser = () => {
    console.log(userToReport);
    console.log(reportMessage);
    axios
      .post("/api/reports/add", { reportedUserId: userToReport, reportMessage: reportMessage })
      .then(() => {
        message.success("User reported successfully!");
        setUserToReport("");
        setReportMessage("");
        setModalReportVisibility(false);
      })
      .catch(() => {
        message.error("Error reporting user.");
      });
  };

  return (
    <>
      {chatsQuery.status === "loading" || profilesQuery.status === "loading"
        ? null
        : filteredChats.map((chat, i) => {
            const { _id, userId, message, timestamp } = chat;
            let profile = findProfile(userId);

            return (
              <div key={i} className="chatBlock">
                <div className="chatMessage">
                  <Popover
                    placement="topLeft"
                    content={
                      <div>
                        <Button
                          className="reportUserBtn"
                          type="danger"
                          size="small"
                          onClick={() => {
                            setModalReportVisibility(true);
                            setUserToReport(profile._id);
                          }}
                        >
                          <p>Report user</p>
                        </Button>
                      </div>
                    }
                    trigger="click"
                  >
                    <div className="chatProfile">
                      <span>
                        <img src={profile.googleImg} style={imgStyle} alt="profileIcon" width="25" />
                        &nbsp;
                      </span>
                      <span className="chatProfileName">
                        {profile.firstName} {profile.lastNameInitial ? profile.lastNameInitial : ""}
                      </span>
                    </div>
                  </Popover>
                  {isAdminOfCurrentChatroom ? (
                    <Popover
                      placement="topLeft"
                      content={
                        <div>
                          <Button className="removeChatBtn" type="danger" size="small" onClick={() => removeMessage(_id)}>
                            <p>Remove message</p>
                          </Button>
                        </div>
                      }
                      trigger="click"
                    >
                      <div className="msgContainer admin">{message}</div>
                    </Popover>
                  ) : (
                    <div className="msgContainer">{message}</div>
                  )}
                </div>
                <div className="chatTime">
                  {new Date(timestamp).toLocaleTimeString("en-US")}&nbsp;&nbsp;
                  {new Date(timestamp).toLocaleDateString("en-US", DATE_OPTIONS)}
                </div>
              </div>
            );
          })}
      <Space />
      <Modal
        title="Create new chatroom"
        centered
        visible={modalReportVisibility}
        onOk={() => setModalReportVisibility(false)}
        onCancel={() => setModalReportVisibility(false)}
        footer={[
          <Button key="submitNewChatroom" type="primary" onClick={reportUser}>
            Submit
          </Button>,
        ]}
      >
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          layout="horizontal"
        >
          <Form.Item label="Reason for report">
            <Input onChange={settingReportMessage} name="reportMessage" value={reportMessage} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Chats;
