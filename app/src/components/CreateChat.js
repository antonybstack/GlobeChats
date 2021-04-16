import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chatroom from './Chatroom';

function CreateChat(props) {

    const [ name, setName ] = useState("");
    const [ topics, setTopics ] = useState("");
    const [ pub, setPub] = useState("");
    const [ anon, setAnon ] = useState("");

    const [ displayChatroom, setDisplayChatroom ] = useState(false);

    const settingName = (event) => setName(event.target.value);
    const settingTopics = (event) => setTopics(event.target.value);
    const settingPublic = (event) => setPub(event.target.value);
    const settingAnon = (event) => setAnon(event.target.value);

    var chatroomid = -1;

    const submitNewChatroom = (event) => {
        event.preventDefault();

        if (!name || !topics || !pub || !anon) {
            alert("Please make sure to enter all the fields!");
            return;
        }

        console.log('name ' + name + ' topics ' + topics + ' pub ' + pub + ' anon ' + anon);

        setDisplayChatroom(true);
        document.getElementById("create-chat").innerHTML = "";

        axios
        .post('/api/chatroom/new', {name, topics, pub, anon})
        .then((res) => {
            chatroomid = res.data._id;
            console.log("success!")
        })
        .catch((error) => {
            console.log(error);
        });


    }

    const handleCloseChatroom = (event) => {
        setDisplayChatroom(!displayChatroom);
    }

    return (
        <div>
            <div>
                { displayChatroom ? <Chatroom handleClose={handleCloseChatroom} chatroomid={chatroomid} /> : console.log("test")}
            </div>
            <div id="create-chat">
                <div class="event-create-container">
                    <div class="event-header">
                        <div class="event-header-middle">
                            Create New Chatroom
                        </div>
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
                                <input type="checkbox" onChange={settingPublic} />
                                <span class="slider round"></span>
                            </label>
                            
                        </div>

                        <div class="event-row">
                            <div class="event-col-25">
                                <label class="event-form-label">Anonymous/Verified</label>
                            </div>
                            <label class="event-col-75 switch">
                                <input type="checkbox" onChange={settingAnon} />
                                <span class="slider round"></span>
                            </label>
                        </div>

                        <div class="event-row">
                            <div class="event-col-50-left">
                                <input class="event-submit-buttons" type="submit" value="Create Chatroom" />
                            </div>
                            <div class="event-col-50-right">
                                <input class="event-submit-buttons" type="submit" value="Cancel" onClick={props.handleClose}/>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default CreateChat;