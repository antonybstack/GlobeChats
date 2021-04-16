import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Profile(props) {

    var email; 
    var first;
    var last;
    
    

    /*axios
        .get('/api/profile/spec', {doc.cookies.userId})
        .then((res) => {
            console.log(res.data);
            email = res.data.email;
            first = res.data.first;
            last = res.data.last;
        
            console.log("success!")
        })
        .catch((error) => {
            console.log(error);
        });
*/
    

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
                        User:
                        <div> joshaboyer2@gmail.com </div>
                        

                        
                    </div>
            </div>
            
                

                

            
                    
                
    );
};

export default Profile;