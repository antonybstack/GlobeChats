import React from "react";
import { useState, useEffect } from "react";
import "./Friend.css";
import Profile from "./Profile.js";
import axios from "axios";

const Friend = (props) => {
  const [friendList, setFriendList] = useState("");
  const [friendClicked, setFriendClicked] = useState({
    friendClicked: false,
  });
  const [name, setName] = useState("");

  const friendOnClick = () => {
    console.log("Clicked");
    setFriendClicked({
      friendClicked: !friendClicked.friendClicked,
    });
  };

  useEffect(() => {
    /*axios
      .post("/api/friends/friend-info", { googleId: props.googleId })
      .then((res) => {
        console.log(res.data);
        setName(res.data.firstname);
      })
      .catch((error) => {
        console.log(error);
      });*/
  });

  return (
    <div>
      <div>
        {friendClicked.friendClicked ? (
          <Profile googleId={props.googleId} handleClose={friendOnClick} />
        ) : null}
      </div>
      <div className="friend-item">
        <div class="friend-list-group">
          {" "}
          <span class="friend-list-group-item" onClick={friendOnClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="currentColor"
              class="bi bi-circle-fill"
              viewBox="0 0 16 16"
            >
              <circle cx="8" cy="8" r="8" />
            </svg>
            &nbsp;
            {name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Friend;
