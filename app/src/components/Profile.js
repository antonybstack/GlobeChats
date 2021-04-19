import React, { useEffect, useContext, useRef, useState } from 'react';
import axios from 'axios';

function Profile(props) {
    const [ email, setEmail ] = useState("");
    const [ first, setFirst ] = useState("");
    const [ last, setLast ] = useState("");

    useEffect(() => {
        axios.post('/api/profile/spec', {googleId: props.googleId})
        .then((res) => {
            console.log(res.data);
            setEmail(res.data.email);
            setFirst(res.data.firstName);
            setLast(res.data.lastName);
            console.log(email + " " + first + " " + last);
            console.log("success!")
        })
        .catch((error) => {
            console.log(error);
        });
    });

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
                    <div class="profile-title">User:</div>
                    <div class="profile-text">{first} {last}</div>
                    <div class="profile-title">Email:</div>
                    <div class="profile-text">{email}</div>
                </div>
            </div>
    );
};

export default Profile;