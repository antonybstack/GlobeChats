import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useAtom } from "jotai";
import { userAtom, isUserAuthenticated, fetchUserAtom, fetchSocketAtom, socketAtom, connectedUsersAtom } from "../atoms/AtomHelpers";
import axios from "axios";
import { Modal, Form, Input, Button, Switch, message, Space, Checkbox } from "antd";
import ReCAPTCHA from "react-google-recaptcha";

const LoginConfirmation = (props) => {
  //console.log(props);
  const [declineDisabled, setDeclineDisabled] = useState(true);

  function createCookie(name, value, days) {
    var date, expires;
    if (days) {
      date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    } else {
      expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
  }

  const onChange = (value) => {
    //console.log("Captcha value:", value);

    createCookie("captcha", "authenticated", 7);

    if (value) {
      setDeclineDisabled(true);
      props.setLoginConfirmed(true);
      props.setModalVisibility(false);
    }
  };

  const decline = () => {
    props.setModalVisibility(false);
    props.setLoginConfirmed(false);
    message.error("Login canceled.");
  };

  return (
    <>
      <Space />
      <Modal
        title="Security Check"
        centered
        width="350px"
        visible={props.modalVisibility}
        maskClosable={false}
        mask={false}
        closable={false}
        footer={[
          <Button type="secondary" size="small" disable={declineDisabled} onClick={() => decline()}>
            Cancel
          </Button>,
        ]}
      >
        <ReCAPTCHA sitekey="6LcJbskaAAAAAJ9iHGcnzNZEirW2u584BQrpgYGD" onChange={onChange} />,
      </Modal>
    </>
  );
};

export default LoginConfirmation;
