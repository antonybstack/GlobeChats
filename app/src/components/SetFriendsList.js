import React, { useEffect, useState } from "react";
import axios from "axios";

function SetFriendsList(props) {
  const [individualFriends, setIndividualFriends] = useState("");
  const settingFriends = (event) => SetFriendsList(event.target.value);

  const addIndividualFriend = (event) => {
    axios
      .post("/api/friends/add", { individualFriends })
      .then((res) => {
        console.log("Added Friend!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addFriendClick = (event) => {};
}

export default SetFriendsList;
