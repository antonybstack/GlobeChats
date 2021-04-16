import React from "react";
import Friend from "./Friend";

const FriendsList = (props) => {

  return (
    <div className="friends-list-container">
      <span className="friends-list-header">
        Friends
      </span>
      {props.friend.map((c) => (
        <Friend key={c.id} name={c.name} />
      ))}
    </div>
  );
};

export default FriendsList;
