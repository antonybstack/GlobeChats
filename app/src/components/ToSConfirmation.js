import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated, fetchUserAtom, fetchSocketAtom, socketAtom, connectedUsersAtom, displayTosAtom, displayPrivacyPolicyAtom } from "../atoms/AtomHelpers";
import axios from "axios";
import { Modal, Form, Input, Button, Switch, message, Space, Checkbox } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

const LoginConfirmation = (props) => {
  console.log(props);
  const [user, setUser] = useAtom(userAtom);

  const [captchaConfirmed, setCaptchaConfirmed] = useState(false);
  const [tosConfirmed, setTosConfirmed] = useState(false);
  const [agreeDisabled, setAgreeDisabled] = useState(true);

  const [displayTos, setDisplayTos] = useAtom(displayTosAtom);
  const [displayPrivacyPolicy, setDisplayPrivacyPolicy] = useAtom(displayPrivacyPolicyAtom);

  const accept = () => {
    axios
      .put("/api/users/agreetoterms/" + user._id)
      .then((res) => {
        setUser(res.data.user);
        message.success("Accepted Terms and Conditions and Privacy Policy!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Error updating user's agreement to Terms and Conditions.");
      });
  };

  useEffect(() => {
    if (tosConfirmed) setAgreeDisabled(false);
    else setAgreeDisabled(true);
  }, [tosConfirmed]);

  return (
    <>
      <Space />
      <Modal
        title="Accept Terms"
        centered
        visible={true}
        maskClosable={false}
        closable={false}
        footer={[
          <Button type="primary" onClick={() => setDisplayTos(!displayTos)} style={{ float: "left" }}>
            Terms of Service
          </Button>,
          <Button type="primary" onClick={() => setDisplayPrivacyPolicy(!displayPrivacyPolicy)} style={{ float: "left" }}>
            Privacy Policy
          </Button>,
          <Button type="primary" onClick={() => accept()} disabled={agreeDisabled}>
            Accept
          </Button>,
        ]}
      >
        <Form layout="horizontal">
          <Form.Item>
            <Checkbox checked={tosConfirmed} onChange={() => setTosConfirmed(!tosConfirmed)}>
              <span>I agree to the GlobeChats Terms of Service and Privacy Policy</span>
            </Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LoginConfirmation;
