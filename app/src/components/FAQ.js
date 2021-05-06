import React, { useState, useEffect } from "react";
import { Modal, Button, Space } from "antd";

const FAQ = () => {

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    return (
        <>
            <div className="links" onClick={toggleVisible}>
                FAQ
            </div>
            <Modal
                title="Frequently Asked Questions"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                <h3><b>What is Globe Chats?</b></h3>
                <p>GlobeChats is a location-based chat room application that is tailored to specific interests. Users are able to be socially active around nearby individuals from the comfort of their home. GlobeChats also allows users to create and plan in-person events for those nearby to meet up safely.</p>

                <h3><b>How do I make an account?</b></h3>
                <p>We currently use Google Identity to handle logins. Choose the "Sign In with Google" button at the top-right corner of the screen to connect your Google account.</p>

                <h3><b>How do I create a chat room?</b></h3>
                <p>Click on the Create Chat button at the bottom right-hand corner, enter in some basic information, and you'll be chatting in no time!</p>
                
                <h3><b>How many people can join a chat room?</b></h3>
                <p>There is currently no limit on the number of people that can join a group.</p>

                <h3><b>Can someone outside of my area join my chat room?</b></h3>
                <p>No, you can only join nearby chat rooms.</p>

                <h3><b>How do I report a user?</b></h3>
                <p>Open the chatroom that the user is in, hover over their name and then click on the "Report User" button. Be sure to fill out the reason box!</p>

                <h3><b>How do you kick a user out of a chat room?</b></h3>
                <p>Admins can kick a user out of a chat room by selecting the user in the Members List and clicking the "Kick User" button.</p>
                
                <h3><b>Is my location being shared?</b></h3>
                <p>Your location is not being stored on our servers. Your location is only being used to figure out where in the world you are and where to place a new chat room after you create one. Other than that, we do not store any personal location information.</p>
            </Modal>
        </>
    );
};

export default FAQ;