import React, { useContext } from "react";
import Friend from "./Friend";
import { AuthContext } from "../contexts/AuthContext";

const FriendsList = (props) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="friends-list-container">
      <div className="friends-list-header">Friends</div>
      <Friend />
    </div>
  );
};

export default FriendsList;
