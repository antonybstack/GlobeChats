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
                THIS WILL BE FIXED!
                <p>How do you create a group in GlobeChats?</p>
                <p>Click on the group icon on the bottom right-hand corner and then enter the information in to create a group.</p>
                
                <p>How do you report a user?</p>
                <p>Find the user in the group and click on their name. It will open their profile and click on “report user.”</p>

                <p>How many people can join a group?</p>
                <p>Unlimited.</p>

                <p>Can you someone out of the country join your Globe Chat group?</p>
                <p>No, it is based on your location.</p>

                <p>How do you kick a user out of a group?</p>
                <p>??????????????</p>

                <p>How do you create an account in Globe Chats?</p>
                <p>Sign in with google and connect your google account.</p>

                <p>What is Globe Chats?</p>
                <p>Check out the “About Us” page.</p>
                
                <p>Does Globe Chats allow anyone to join or can you create a private group?</p>
                <p>You can create a private group.</p>
                
                <p>How do I hide my location?</p>
                <p>Your location is hidden by default but you can allow the app to use your location with permission.</p>
            </Modal>
        </>
    );
};

export default FAQ;