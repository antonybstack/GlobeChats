import React, { useEffect, useContext, useRef, useState } from "react";
import axios from "axios";

function Profile(props) {
    const [ email, setEmail ] = useState("");
    const [ first, setFirst ] = useState("");
    const [ last, setLast ] = useState("");
    const [ image, setImage ] = useState("");

    axios.post('/api/profile/spec', {googleId: props.googleId})
    .then((res) => {
        console.log(res.data);
        setEmail(res.data.email);
        setFirst(res.data.firstName);
        setLast(res.data.lastName);
        setImage(res.data.googleImg);
        console.log(email + " " + first + " " + last);
        console.log("success!")
    })
    .catch((error) => {
        console.log(error);
    });

    const addNewFriend = (event) => {
        event.preventDefault();
    }

    return (
            <div class="event-create-container">
                
                <div class="event-header">
                    <div class="event-header-middle">
                        Profile
                    </div>
                    <div class="event-close-outside" onClick={props.handleClose}>
                        <div class="event-close-x-left">
                        <div class="event-close-x-right"></div>
                        </div>
                    </div>
                </div>
                <div class="event-form">
                    <div class="profile-pic"><img src={image} alt={"Profile"} /></div>
                    <div class="profile-title">User:</div>
                    <div class="profile-text">{first} {last}</div>
                    { !props.loggedInProfile ? <>
                        <div class="profile-title">Email:</div>
                        <div class="profile-text">{email}</div> </> : 
                        <button class="add-friend" onClick={addNewFriend}>Add friend</button>
                    }
                </div>
            </div>
    );
};

export default Profile;
