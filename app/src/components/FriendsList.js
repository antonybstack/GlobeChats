import React, { useContext, useEffect, useState } from "react";
import Friend from "./Friend";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const FriendsList = (props) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [ friendList, setFriendList ] = useState([""]);

  useEffect(() => {
    axios
      .post("/api/friends/friends-list", { googleId: user.googleId })
      .then((res) => {
        console.log(res.data);
        setFriendList(res.data[0]);
        console.log(friendList);
        console.log("Added Friends!");
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div className="friends-list-container">
      <div className="friends-list-header">Friends</div>
      {friendList ? <><Friend googleId={friendList[0].googleId} /></> : (
        null
      ) }
      
    </div>
  );
};

export default FriendsList;
