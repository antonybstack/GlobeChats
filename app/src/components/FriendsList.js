import React from "react";
import Friend from "./Friend";

const FriendsList = (props) => {
  return (
    <div className="container">
      <span className="Header">
        Friends
      </span>
      {props.friend.map((c) => (
        <Friend key={c.id} name={c.name} />
      ))}
    </div>
  );
};

export default FriendsList;
