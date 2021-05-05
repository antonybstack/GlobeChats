import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import { useAtom } from "jotai";
import { isUserAuthenticated } from "../atoms/AtomHelpers";
import { Button } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";
import { useQuery, useQueryClient } from "react-query";
import { Popover } from "antd";
import { SettingTwoTone, InfoCircleTwoTone } from "@ant-design/icons";
import ChatroomInfo from "./ChatroomInfo";

function MembersList({ props }) {
  const { isAdminOfCurrentChatroom, chatroom } = props;
  console.log(isAdminOfCurrentChatroom);
  //   const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  const refElem = useRef();
  const [, setFilteredMembers] = useState([]);

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

  const kickUser = () => {
    console.log("Kick feature not yet implemented.");
  };

  useEffect(() => {
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

    setFilteredMembers(membersQuery.data);
  }, [membersQuery.data]);

  useEffect(() => {}, []);

  const toggleMenu = () => {
    console.log(refElem);
    if (refElem.current.offsetLeft === 0) document.getElementById("membersListContainer").style.left = "-175px";
    else document.getElementById("membersListContainer").style.left = "0px";
  };

  const addFriend = () => {
    console.log("Add friend feature not yet implemented.");
  };

  var imgStyle = {
    borderRadius: "20px",
  };

  const content = (
    <div>
      {isAdminOfCurrentChatroom ? (
        <Button className="kickUserBtn" type="danger" size="small" onClick={kickUser}>
          <p>Kick User</p>
        </Button>
      ) : null}
      <Button className="addFriendBtn" type="primary" size="small" onClick={addFriend}>
        <p>Add friend</p>
      </Button>
    </div>
  );

  return (
    <>
      <Button id="memberslistToggleBtn" type="secondary" size="medium" onClick={toggleMenu}>
        <MenuFoldOutlined style={{ fontSize: "1.5em", color: "#6f6f6f" }} />
      </Button>
      <div id="membersListContainer" ref={refElem}>
        <ChatroomInfo props={{ isAdminOfCurrentChatroom, chatroom }} />
        <div className="membersListTitle">Members in Chat</div>
        <div className="membersList">
          {membersQuery.status === "loading"
            ? null
            : membersQuery.data.users.map((user, i) => {
                const { firstName, lastName, googleImg } = user;

                return (
                  <Popover placement="topLeft" content={content} trigger="click">
                    <div className="memberProfile">
                      <span>
                        <img src={googleImg} style={imgStyle} alt="profileIcon" width="25" />
                        &nbsp;
                      </span>
                      <span className="profileName">
                        {firstName} {lastName ? lastName[0] + "." : ""}
                      </span>
                    </div>
                  </Popover>
                );
              })}
        </div>
      </div>
    </>
  );
}

export default MembersList;
