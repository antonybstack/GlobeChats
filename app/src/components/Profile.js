import React, { useEffect, useContext, useRef, useState } from "react";
import axios from "axios";
import moment from "moment-timezone";

function Profile(props) {
  const [email, setEmail] = useState("");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");

  axios
    .post("/api/profile/spec", { googleId: props.googleId })
    .then((res) => {
      setEmail(res.data.email);
      setFirst(res.data.firstName);
      setLast(res.data.lastName);
      setImage(res.data.googleImg);
      setUserId(res.data._id);
    })
    .catch((err) => {
      console.log(err);
    });

  const addNewFriend = (event) => {
    event.preventDefault();
    let date = moment().tz("America/New_York");
    axios.post("/api/friend/new", {
      user: userId,
      friendedDate: date,
      onlineStatus: true,
    });
  };

  return (
    <div className="event-create-container">
      <div className="event-header">
        <div className="event-header-middle">Profile</div>
        <div className="event-close-outside" onClick={props.handleClose}>
          <div className="event-close-x-left">
            <div className="event-close-x-right"></div>
          </div>
        </div>
      </div>
      <div className="event-form">
        <div className="profile-pic">
          <img src={image} alt={"Profile"} />
        </div>
        <div className="profile-title">User:</div>
        <div className="profile-text">
          {first} {last}
        </div>
        {props.loggedInProfile ? (
          <>
            <div className="profile-title">Email:</div>
            <div className="profile-text">{email}</div>{" "}
          </>
        ) : (
          <button className="add-friend" onClick={addNewFriend}>
            Add friend
          </button>
        )}
      </div>
    </div>
  );
}

export default Profile;
