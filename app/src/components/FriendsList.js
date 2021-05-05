import React, { useEffect, useState, useRef } from "react";
import Friend from "./Friend";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated } from "../atoms/AtomHelpers";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Button } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

const FriendsList = () => {
  // const { user, isAuthenticated } = useContext(AuthContext);
  // const [user] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  // const [friendList, setFriendList] = useState([""]);
  const refElem = useRef();
  // const queryClient = useQueryClient();
  // const [, setFilteredMembers] = useState([]);

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
  //   if (isAuthenticated) {
  //     axios
  //       .post("/api/friends/friends-list", { googleId: user.googleId })
  //       .then((res) => {
  //         setFriendList(res.data[0]);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }, [isAuthenticated, user]);

  const toggleMenu = () => {
    if (refElem.current.offsetLeft === 0) {
      document.getElementById("friendsListContainer").style.left = "-175px";
      document.getElementById("friendlistToggleBtn").style.left = "10px";
    } else {
      document.getElementById("friendsListContainer").style.left = "0px";
      document.getElementById("friendlistToggleBtn").style.left = "50px";
    }
  };

  var imgStyle = {
    borderRadius: "20px",
  };

  return (
    <>
      <Button id="friendlistToggleBtn" type="primary" size="medium" onClick={toggleMenu}>
        <MenuFoldOutlined style={{ fontSize: "1.5em", color: "white" }} />
        <span id="friendlistToggleBtnLabel">Friends</span>
      </Button>
      <div id="friendsListContainer" ref={refElem}>
        <div id="friendsList">
          <br />
          <br />
          {membersQuery.status === "loading"
            ? null
            : membersQuery.data.users.map((user, i) => {
                const { firstName, lastName, googleImg } = user;

                return (
                  <div key={user._id} className="friendProfile">
                    <span>
                      <img src={googleImg} style={imgStyle} alt="profileIcon" width="25" />
                      &nbsp;
                    </span>
                    <span className="profileName">
                      {firstName} {lastName ? lastName[0] + "." : ""}
                    </span>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
