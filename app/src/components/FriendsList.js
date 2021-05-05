import React, { useEffect, useState, useRef } from "react";
import Friend from "./Friend";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated, connectedUsersAtom } from "../atoms/AtomHelpers";
import { isError, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { Button, Divider } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

const FriendsList = () => {
  // const { user, isAuthenticated } = useContext(AuthContext);
  // const [user] = useAtom(userAtom);
  const [user] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  const [connectedUsers, setConnectedUsers] = useAtom(connectedUsersAtom);
  // const [friendList, setFriendList] = useState([""]);
  const refElem = useRef();
  // const queryClient = useQueryClient();
  // const [, setFilteredMembers] = useState([]);

  useEffect(() => {
    console.log(connectedUsers);
  }, [connectedUsers]);

  const friendsQuery = useQuery(
    "friends",
    () => {
      return axios
        .get("/api/users/")
        .then((res) => {
          console.log(connectedUsers);
          var friends = [];
          console.log(res.data);
          res.data.users.forEach((tempUser) => {
            if (user.friendlist.includes(tempUser._id)) {
              friends.push(tempUser);
            }
            console.log(user.friendlist);
            console.log(tempUser._id);
            console.log(friends);
          });
          return friends;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    {
      // The query will not execute until exists
      enabled: !!connectedUsers,
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

  useEffect(() => {
    console.log(friendsQuery);
  }, [friendsQuery]);

  const toggleMenu = () => {
    if (refElem.current.offsetLeft === 0) {
      document.getElementById("friendsListContainer").style.left = "-175px";
      document.getElementById("friendlistToggleBtn").style.left = "10px";
    } else {
      document.getElementById("friendsListContainer").style.left = "0px";
      document.getElementById("friendlistToggleBtn").style.left = "50px";
    }
  };

  return (
    <>
      <Button id="friendlistToggleBtn" type="primary" size="medium" onClick={toggleMenu}>
        <MenuFoldOutlined style={{ fontSize: "1.5em", color: "white" }} />
        <span id="friendlistToggleBtnLabel">Friends</span>
      </Button>
      <div id="friendsListContainer" ref={refElem}>
        <div id="onlineFriendsList">
          <br />
          <br />
          <br />
          <span>Online</span>
          <Divider />
          {friendsQuery.status === "loading"
            ? null
            : friendsQuery.data.map((user, i) => {
                const { _id, firstName, lastName, googleImg } = user;
                var isFriendOnline = false;
                connectedUsers.forEach((connectedUser) => {
                  if (connectedUser._id === _id) {
                    isFriendOnline = true;
                  }
                });

                if (isFriendOnline) {
                  return (
                    <div key={user._id} className="friendProfile">
                      <span>
                        <img src={googleImg} className={"profileImg" + (isFriendOnline ? " online" : "")} alt="profileIcon" width="25" />
                        &nbsp;
                      </span>
                      <span className={"profileName" + (isFriendOnline ? " online" : "")}>
                        {firstName} {lastName ? lastName[0] + "." : ""}
                      </span>
                    </div>
                  );
                } else return null;
              })}
        </div>
        <div id="offlineFriendsList">
          <span>Offline</span>
          <Divider />
          {friendsQuery.status === "loading"
            ? null
            : friendsQuery.data.map((user, i) => {
                const { _id, firstName, lastName, googleImg } = user;
                var isFriendOnline = false;
                connectedUsers.forEach((connectedUser) => {
                  if (connectedUser._id === _id) {
                    isFriendOnline = true;
                  }
                });

                if (!isFriendOnline) {
                  return (
                    <div key={user._id} className="friendProfile">
                      <span>
                        <img src={googleImg} className={"profileImg" + (isFriendOnline ? " online" : "")} alt="profileIcon" width="25" />
                        &nbsp;
                      </span>
                      <span className={"profileName" + (isFriendOnline ? " online" : "")}>
                        {firstName} {lastName ? lastName[0] + "." : ""}
                      </span>
                    </div>
                  );
                } else return null;
              })}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
