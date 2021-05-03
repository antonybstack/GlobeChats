import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAtom } from "jotai";
import { userAtom } from "../atoms/AuthAtom";
import Chatroom from "./Chatroom";
import { useMutation, useQueryClient } from "react-query";

function CreateChat(props) {
  const [user] = useAtom(userAtom);
  const queryClient = useQueryClient();

  const addChatroomMutation = useMutation((newChatroom) => axios.post("/api/chatrooms/add", newChatroom), {
    onSuccess: async (data) => {
      queryClient.setQueryData("globalChatrooms", data.data);
    },
  });

  const [name, setName] = useState("");
  const [topics, setTopics] = useState("");
  const [pub, setPub] = useState("");
  const [anon, setAnon] = useState("");

  const settingName = (chatroom) => setName(chatroom.target.value);
  const settingTopics = (chatroom) => setTopics(chatroom.target.value);
  const settingPublic = (chatroom) => setPub(chatroom.target.value);
  const settingAnon = (chatroom) => setAnon(chatroom.target.value);

  const [displayChatroom, setDisplayChatroom] = useState(false);
  const [lng, setLng] = useState(-80.8315);
  const [lat, setLat] = useState(35.21);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
    });
    
    navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
      permissionStatus.onchange = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLng(position.coords.longitude);
      setLat(position.coords.latitude);
        });
      };
    });
  }, []);

  const submitNewChatroom = (chatroom) => {
    chatroom.preventDefault();

    if (!name) {
      alert("Please make sure to enter all the fields!");
      return;
    }

    setDisplayChatroom(true);
    document.getElementById("create-chat").innerHTML = "";

    var isPrivate = pub === "true";
    var verifyUsers = anon === "true";

    let longitude_buffer_for_privacy = Math.random() * 0.05 * (Math.round(Math.random()) ? 1 : -1);
    let latitude_buffer_for_privacy = Math.random() * 0.05 * (Math.round(Math.random()) ? 1 : -1);

    addChatroomMutation.mutate({
      adminId: user._id,
      name: name,
      tags: topics,
      isPrivate: isPrivate,
      verifyUsers: verifyUsers,
      location: [lng + longitude_buffer_for_privacy, lat + latitude_buffer_for_privacy],
    });
  };



  return (
    <div>
      <div id="create-chat">
        <div className="event-create-container">
          <div className="event-header">
            <div className="event-header-middle">Create New Chatroom</div>
            <div className="event-close-outside" onClick={props.handleClose}>
              <div className="event-close-x-left">
                <div className="event-close-x-right"></div>
              </div>
            </div>
          </div>
          <form className="event-form" onSubmit={submitNewChatroom}>
            <div className="event-row">
              <div className="event-col-25">
                <label className="event-form-label">Chat Name</label>
              </div>
              <div className="event-col-75">
                <input className="event-input-text" type="text" name="{name}" onChange={settingName} />
              </div>
            </div>

            <div className="event-row">
              <div className="event-col-25">
                <label className="event-form-label">Chat Topics</label>
              </div>
              <div className="event-col-75">
                <input className="event-input-text" type="text" name="{topics}" onChange={settingTopics} />
              </div>
            </div>

            <div className="event-row">
              <div className="event-col-25">
                <label className="event-form-label">Public/Private</label>
              </div>
              <label className="event-col-75 switch">
                <input type="checkbox" onChange={settingPublic} />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="event-row">
              <div className="event-col-25">
                <label className="event-form-label">Anonymous/Verified</label>
              </div>
              <label className="event-col-75 switch">
                <input type="checkbox" onChange={settingAnon} />
                <span className="slider round"></span>
              </label>
            </div>

            <div className="event-row">
              <div className="event-col-50-left">
                <input className="event-submit-buttons" type="submit" value="Create Chatroom" />
              </div>
              <div className="event-col-50-right">
                <input className="event-submit-buttons" type="submit" value="Cancel" onClick={props.handleClose} />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateChat;
