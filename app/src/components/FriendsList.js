import React, { useEffect, useState, useRef } from "react";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated, connectedUsersAtom } from "../atoms/AtomHelpers";
import { useQuery, queryClient, useQueryClient } from "react-query";
import axios from "axios";
import { Popover, Button, Divider, message } from "antd";
import { MenuFoldOutlined } from "@ant-design/icons";

const FriendsList = () => {
  // const { user, isAuthenticated } = useContext(AuthContext);
  // const [user] = useAtom(userAtom);
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated] = useAtom(isUserAuthenticated);
  const [connectedUsers, setConnectedUsers] = useAtom(connectedUsersAtom);
  // const [friendList, setFriendList] = useState([""]);
  const refElem = useRef();
  const queryClient = useQueryClient();
  // const queryClient = useQueryClient();
  // const [, setFilteredMembers] = useState([]);

  const friendsQuery = useQuery(
    "friends",
    () => {
      return axios
        .get("/api/users/")
        .then((res) => {
          var friends = [];
          //console.log(res.data);
          res.data.users.forEach((tempUser) => {
            if (user.friendlist.includes(tempUser._id)) {
              friends.push(tempUser);
            }
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
    //console.log(friendsQuery);
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

  const removeFriend = (_id) => {
    //console.log(_id);
    axios
      .put("/api/users/removefriend/" + user._id, { friend: _id })
      .then((updatedUserData) => {
        setUser(updatedUserData.data.user);
        message.success("Friend removed successfully!");
        axios
          .get("/api/users/")
          .then((res) => {
            var friends = [];
            //console.log(res.data);
            //console.log(updatedUserData.data.user);
            res.data.users.forEach((tempUser) => {
              if (updatedUserData.data.user.friendlist.includes(tempUser._id)) {
                friends.push(tempUser);
              }

              //console.log(tempUser._id);
              //console.log(friends);
            });
            //console.log(friends);
            queryClient.setQueryData("friends", friends);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {
        message.error("Error removing friend.");
      });
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
                    <Popover
                      placement="topLeft"
                      content={
                        <div>
                          <Button className="removeFriendBtn" type="danger" size="small" onClick={() => removeFriend(_id)}>
                            <p>Remove friend</p>
                          </Button>
                        </div>
                      }
                      trigger="click"
                    >
                      <div key={user._id} className="friendProfile">
                        <span>
                          <img src={googleImg} className={"profileImg" + (isFriendOnline ? " online" : "")} alt="profileIcon" width="25" />
                          &nbsp;
                        </span>
                        <span className={"profileName" + (isFriendOnline ? " online" : "")}>
                          {firstName} {lastName ? lastName[0] + "." : ""}
                        </span>
                      </div>
                    </Popover>
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
                    <Popover
                      placement="topLeft"
                      content={
                        <div>
                          <Button className="removeFriendBtn" type="danger" size="small" onClick={() => removeFriend(_id)}>
                            <p>Remove friend</p>
                          </Button>
                        </div>
                      }
                      trigger="click"
                    >
                      <div key={user._id} className="friendProfile">
                        <span>
                          <img src={googleImg} className={"profileImg" + (isFriendOnline ? " online" : "")} alt="profileIcon" width="25" />
                          &nbsp;
                        </span>
                        <span className={"profileName" + (isFriendOnline ? " online" : "")}>
                          {firstName} {lastName ? lastName[0] + "." : ""}
                        </span>
                      </div>
                    </Popover>
                  );
                } else return null;
              })}
        </div>
      </div>
    </>
  );
};

export default FriendsList;
