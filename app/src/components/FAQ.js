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

                <h3>What is Globe Chats?</h3>
                <p>Check out the “About Us” page.</p>

                <h3>How do I make an account?</h3>
                <p>We currently use Google Identity to handle logins. Choose the "Sign In with Google" button at the top-right corner of the screen to connect your Google account.</p>

                <h3>How do I create a chat room?</h3>
                <p>Click on the Create Chat button at the bottom right-hand corner, enter in some basic information, and you'll be chatting in no time!</p>
                
                <h3>How many people can join a chat room?</h3>
                <p>There is currently no limit on the number of people that can join a group.</p>

                <h3>Can someone outside of my area join my chat room?</h3>
                <p>No, you can only join nearby chat rooms.</p>

                <h3>How do I report a user?</h3>
                <p>Find the user in the group and click on their name. It will open their profile and click on “report user.”</p>

                <h3>How do you kick a user out of a group?</h3>
                <p>??????????????</p>

                
                <h3>How do I hide my location?</h3>
                <p>Your location is hidden by default but you can allow the app to use your location with permission.</p>
            </Modal>
        </>
    );
};

export default FAQ;