import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from "../contexts/AuthContext";


function Profile(props) {
    const { user, isAuthenticated } = useContext(AuthContext);

    var email; 
    var first;
    var last;

    
        
        let infoPacket = {
          userId: user._id,
          first: user.firstName,
          last: user.lastName,
          email: user.email
          
        };
        console.log(infoPacket);
    
    
    

    axios
        .get('/api/profile/spec', infoPacket)
        .then((res) => {
            email = infoPacket.email;
            first = infoPacket.last;
            last = infoPacket.first;
        
            console.log("success!")
        })
        .catch((error) => {
            console.log(error);
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
                    <div class="profile-text"> {infoPacket.first} {infoPacket.last} </div>
                    <div class="profile-title">Email:</div>
                    <div class="profile-text"> {infoPacket.email} </div>
                </div>
            </div>
            
                

                

            
                    
                
    );
};

export default Profile;