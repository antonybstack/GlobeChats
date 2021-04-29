import React, { useEffect, useContext, useState, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated } from "../atoms/AuthAtom";
import { useQuery, useMutation } from "react-query";

const MapMarkerPopup = (props) => {
  const [user, setUser] = useAtom(userAtom);

  //const [globalChatrooms] = useAtom(globalChatroomsAtom);
  const { _id, name, tags, verifyUsers, isPrivate, timestamp } = props.feature.chatroom;

  const joinChatroomMutation = useMutation((newChatroom) => axios.put("/api/users/joinchatroom/" + user._id, newChatroom), {
    onSuccess: async (data) => {
      setUser(data.data.user);
    },
  });

  const globalChatroomsQuery = useQuery("globalChatrooms", () =>
    axios
      .get("/api/chatrooms")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      })
  );

  function joinChatroom() {
    if (_id) {
      joinChatroomMutation.mutate({ chatroom_id: _id });
    }
  }

  // function joinChatroom() {
  //   if (_id) {
  //     axios
  //       .put("/api/users/joinchatroom/" + user._id, { chatroom_id: _id })
  //       .then((res) => {
  //         const newChatroomArr = globalChatroomsQuery.data.chatrooms.filter((chatroom) => chatroom._id === _id);
  //         setChatrooms((currentChatrooms) => [...currentChatrooms, newChatroomArr[0]]);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // }

  const closePopup = () => {
    let arr = document.getElementsByClassName("mapPopup");
    for (var i = 0; i < arr.length; i++) {
      arr.item(i).style.display = "none";
    }
    props.setSelectedMarker(null);
  };

  var style1 = { fontSize: "14pt", display: "inline" };
  var style2 = { fontSize: "12pt", display: "inline", float: "right" };
  var style3 = { fontSize: "10pt" };

  let pri = isPrivate.toString();
  let ver = verifyUsers.toString();

  return (
    <>
      {globalChatroomsQuery.status === "loading chatroom info" ? (
        <div>Loading global chatrooms... </div>
      ) : (
        <div className="mapMarkerPopup">
          <div className="popupTitle">{name}</div>
          <div onClick={closePopup} className="popupCancelButton">
            x
          </div>
          <br />
          <button onClick={joinChatroom}>Click to join</button>
          <div>
            <div style={style3}>Private: {pri}</div>
            <div style={style3}>Verified Users: {ver}</div>
            <div style={style3}>Tags: {tags}</div>
            <div style={style3}>Created: {timestamp}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapMarkerPopup;
