import React, { useEffect, useState } from 'react';

function Chatroom(props) {

    return (
        <div class="event-create-container">
            <div class="event-header">
                <div class="event-header-middle">Chatroom</div>
                <div class="event-close-outside" onClick={props.handleClose}>
                <div class="event-close-x-left">
                    <div class="event-close-x-right"></div>
                </div>
                </div>
            </div>
            <div class="chatroom-container">
                
            </div>
        </div>
    );

}

export default Chatroom;