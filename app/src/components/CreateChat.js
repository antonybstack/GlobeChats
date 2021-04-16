import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

function CreateChat(props) {
  const [name, setName] = useState("");
  const [topics, setTopics] = useState("");
  const [pub, setPub] = useState("");
  const [anon, setAnon] = useState("");
  const { user, isAuthenticated } = useContext(AuthContext);

  const settingName = (chatroom) => setName(chatroom.target.value);
  const settingTopics = (chatroom) => setTopics(chatroom.target.value);
  const settingPublic = (chatroom) => setPub(chatroom.target.value);
  const settingAnon = (chatroom) => setAnon(chatroom.target.value);

  const submitNewChatroom = (chatroom) => {
    chatroom.preventDefault();

    if (!name) {
      alert("Please make sure to enter all the fields!");
      return;
    }

    console.log("name " + name + " topics " + topics + " pub " + pub + " anon " + anon);

    console.log(name);
    console.log(topics);

    console.log(pub);
    console.log(anon);

    var isPrivate = pub == "true";
    var verifyUsers = anon == "true";

    axios
      .post("/api/chatrooms/add", {
        adminId: user._id,
        name: name,
        tags: topics,
        isPrivate: isPrivate,
        verifyUsers: verifyUsers,
        location: 1,
      })
      .then((res) => {
        console.log("success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div class="event-create-container">
      <div class="event-header">
        <div class="event-header-middle">Create New Chatroom</div>
        <div class="event-close-outside" onClick={props.handleClose}>
          <div class="event-close-x-left">
            <div class="event-close-x-right"></div>
          </div>
        </div>
      </div>
      <form class="event-form" onSubmit={submitNewChatroom}>
        <div class="event-row">
          <div class="event-col-25">
            <label class="event-form-label">Chat Name</label>
          </div>
          <div class="event-col-75">
            <input class="event-input-text" type="text" name="{name}" onChange={settingName} />
          </div>
        </div>

        <div class="event-row">
          <div class="event-col-25">
            <label class="event-form-label">Chat Topics</label>
          </div>
          <div class="event-col-75">
            <input class="event-input-text" type="text" name="{topics}" onChange={settingTopics} />
          </div>
        </div>

        <div class="event-row">
          <div class="event-col-25">
            <label class="event-form-label">Public/Private</label>
          </div>
          <label class="event-col-75 switch">
            <input type="checkbox" name="{pub}" onChange={settingPublic} />
            <span class="slider round"></span>
          </label>
        </div>

        <div class="event-row">
          <div class="event-col-25">
            <label class="event-form-label">Anonymous/Verified</label>
          </div>
          <label class="event-col-75 switch">
            <input type="checkbox" name="{anon}" onChange={settingAnon} />
            <span class="slider round"></span>
          </label>
        </div>

        <div class="event-row">
          <div class="event-col-50-left">
            <input class="event-submit-buttons" type="submit" value="Create Chatroom" />
          </div>
          <div class="event-col-50-right">
            <input class="event-submit-buttons" type="submit" value="Cancel" onClick={props.handleClose} />
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateChat;
