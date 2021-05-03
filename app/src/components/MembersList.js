import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import { useAtom } from "jotai";
import { userAtom, currentTab, isUserAuthenticated } from "../atoms/AtomHelpers";
import { Button } from "antd";
import { useQuery, useQueryClient } from "react-query";
import { Popover } from "antd";

function MembersList(props) {
  //   const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  const refElem = useRef();
  const queryClient = useQueryClient();
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
    if (refElem.current.offsetLeft === 0) document.getElementById("friendsListContainer").style.left = "-175px";
    else document.getElementById("friendsListContainer").style.left = "0px";
  };

  const addFriend = () => {
    console.log("Add friend function not implemented");
  };

  var imgStyle = {
    borderRadius: "20px",
  };

  const content = (
    <div>
      <Button id="addFriendBtn" type="primary" size="small" onClick={addFriend}>
        <p>Add friend</p>
      </Button>
    </div>
  );

  return (
    <>
      <Button id="friendlistToggleBtn" type="secondary" size="medium" onClick={toggleMenu}>
        <div id="menuFoldOutlined"></div>
      </Button>
      <div id="friendsListContainer" ref={refElem}>
        <div id="friendsList">
          <h3>Members in Chat:</h3>
          <>
            {membersQuery.status === "loading"
              ? null
              : membersQuery.data.users.map((user, i) => {
                  const { firstName, lastName, googleImg } = user;

                  return (
                    <Popover placement="topLeft" content={content} trigger="click">
                      <div onClick="" className="memberProfile">
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
          </>
        </div>
      </div>
    </>
  );
}

export default MembersList;
