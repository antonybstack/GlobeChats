import React, { useEffect, useContext, useState, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

const MapMarkerPopup = ({ feature }) => {
  const { user, setUser } = useContext(AuthContext);
  const { chatroom_id, name, tags, verifyUsers, isPrivate, timestamp, current_user } = feature;

  function joinChatroom() {
    if (chatroom_id) {
      axios
        .put("/api/users/joinchatroom/" + current_user, { chatroom_id: chatroom_id })
        .then((res) => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  var style1 = { fontSize: "14pt" };
  var style2 = { fontSize: "10pt" };

  let pri = isPrivate.toString();
  let ver = verifyUsers.toString();

  return (
    <div className="mapMarkerPopup">
      <div style={style1}>{name}</div>
      <br />
      <button onClick={joinChatroom}>Click to join</button>
      <div>
        <div style={style2}>Private: {pri}</div>
        <div style={style2}>Verified Users: {ver}</div>
        <div style={style2}>Tags: {tags}</div>
        <div style={style2}>Created: {timestamp}</div>
      </div>
    </div>
  );
};

export default MapMarkerPopup;
