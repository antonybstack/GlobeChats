import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated, connectedUsersAtom } from "../atoms/AtomHelpers";
import { MenuFoldOutlined, CrownTwoTone } from "@ant-design/icons";
import { useQuery, useQueryClient } from "react-query";
import { Popover, Space, message, Button } from "antd";

import ChatroomInfo from "./ChatroomInfo";

function MembersList({ props }) {
  const { isAdminOfCurrentChatroom, chatroom } = props;
  console.log(isAdminOfCurrentChatroom);
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  const refElem = useRef();
  const [filteredMembers, setFilteredMembers] = useState([]);
  const queryClient = useQueryClient();
  const [connectedUsers, setConnectedUsers] = useAtom(connectedUsersAtom);

  const membersQuery = useQuery(
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

  // useEffect(() => {
  // if (membersQuery) {
  //   if (membersQuery.data) {
  //     if (membersQuery.data.chats) {
  //       const temp = membersQuery.data.users.filter((user) => {
  //         return user.chatroomId === currentTab.chatroom_id;
  //       });
  //       setFilteredMembers(temp);
  //     }
  //   }
  // }

  //   setFilteredMembers(membersQuery.data);
  // }, [membersQuery.data]);

  useEffect(() => {}, []);

  const toggleMenu = () => {
    console.log(refElem);
    if (refElem.current.offsetLeft === 0) document.getElementById("membersListContainer").style.left = "-175px";
    else document.getElementById("membersListContainer").style.left = "0px";
  };

  const kickUser = (_id) => {
    console.log(_id);
    axios
      .put("/api/users/leavechatroom/" + _id, { chatroom_id: chatroom._id })
      .then(() => {
        message.success("User removed from chatroom successfully!");
        axios
          .get("/api/users/")
          .then((res) => {
            console.log(res.data.users);
            queryClient.setQueryData("profiles", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {
        message.error("Error removing user from chatroom.");
      });
  };

  const addFriend = (_id) => {
    console.log(_id);
    axios
      .put("/api/users/addfriend/" + user._id, { newFriend: _id })
      .then((updatedUserData) => {
        setUser(updatedUserData.data.user);
        message.success("User added as a friend successfully!");
        axios
          .get("/api/users/")
          .then((res) => {
            console.log(connectedUsers);
            var friends = [];
            console.log(res.data);
            console.log(updatedUserData.data.user);
            res.data.users.forEach((tempUser) => {
              if (updatedUserData.data.user.friendlist.includes(tempUser._id)) {
                friends.push(tempUser);
              }

              console.log(tempUser._id);
              console.log(friends);
            });
            console.log(friends);
            queryClient.setQueryData("friends", friends);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {
        message.error("User already added.");
      });
  };

  var imgStyle = {
    borderRadius: "20px",
  };

  // useEffect(() => {
  //   if (membersQuery) {
  //     if (membersQuery.data) {
  //       if (membersQuery.data.users) {
  //         const temp = membersQuery.data.users.filter((member) => {
  //           return member.joinedChatroomIds.filter((memberJoinedChatroom) => {
  //             console.log(member.lastName);
  //             console.log(memberJoinedChatroom === chatroom._id);
  //             return memberJoinedChatroom === chatroom._id;
  //           });
  //           // console.log(chatroom._id);
  //           // console.log(member);
  //           // return member.chatroomId[0] === chatroom._id;
  //         });
  //         console.log(temp);
  //         setFilteredMembers(temp);
  //       }
  //     }
  //   }
  // }, [membersQuery.data]);

  useEffect(() => {
    if (membersQuery && chatroom) {
      if (membersQuery.data) {
        if (membersQuery.data.users) {
          const temp = membersQuery.data.users.filter((member) => {
            let match = false;
            member.joinedChatroomIds.forEach((memberJoinedChatroom) => {
              if (memberJoinedChatroom === chatroom._id) match = true;
            });
            if (match) return member;
          });
          setFilteredMembers(temp);
        }
      }
    }
  }, [membersQuery.data]);

  return (
    <>
      <Space />
      <Button id="memberslistToggleBtn" type="secondary" size="medium" onClick={toggleMenu}>
        <MenuFoldOutlined style={{ fontSize: "1.5em", color: "#6f6f6f" }} />
      </Button>
      <div id="membersListContainer" ref={refElem}>
        <ChatroomInfo props={{ isAdminOfCurrentChatroom: isAdminOfCurrentChatroom, chatroom: chatroom }} />
        <div className="membersListTitle">Members in Chat</div>
        <div className="membersList">
          {membersQuery.status === "loading"
            ? null
            : filteredMembers.map((tempUser, i) => {
                const { _id, firstName, lastName, googleImg } = tempUser;
                var isFriendOnline = false;
                connectedUsers.forEach((connectedUser) => {
                  if (connectedUser._id === _id) {
                    isFriendOnline = true;
                  }
                });

                return (
                  <>
                    {user._id !== _id ? (
                      <Popover
                        placement="topLeft"
                        content={
                          <div>
                            {isAdminOfCurrentChatroom ? (
                              <Button className="kickUserBtn" type="danger" size="small" onClick={() => kickUser(_id)}>
                                <p>Kick User</p>
                              </Button>
                            ) : null}
                            <Button className="addFriendBtn" type="primary" size="small" onClick={() => addFriend(_id)}>
                              <p>Add friend</p>
                            </Button>
                          </div>
                        }
                        trigger="click"
                      >
                        <div className="memberProfile">
                          <span>
                            <img src={googleImg} className={"profileImg" + (isFriendOnline ? " online" : "")} alt="profileIcon" width="25" />
                            &nbsp;
                          </span>
                          <span className={"profileName" + (isFriendOnline ? " online" : "")}>
                            {firstName} {lastName ? lastName[0] + "." : ""}
                          </span>
                          {_id === chatroom.adminId ? <CrownTwoTone style={{ fontSize: "1.3em" }} twoToneColor="gold" /> : null}
                        </div>
                      </Popover>
                    ) : (
                      <div className="memberProfile">
                        <span>
                          <img src={googleImg} className={"profileImg" + (isFriendOnline ? " online" : "")} alt="profileIcon" width="25" />
                          &nbsp;
                        </span>
                        <span className={"profileName" + (isFriendOnline ? " online" : "")}>
                          {firstName} {lastName ? lastName[0] + "." : ""}
                        </span>
                        {_id === chatroom.adminId ? <CrownTwoTone style={{ fontSize: "1.3em" }} twoToneColor="gold" /> : null}
                      </div>
                    )}
                  </>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default MembersList;
