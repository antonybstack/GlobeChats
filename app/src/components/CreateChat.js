import React, { useEffect, useState } from "react";
import axios from "axios";

import { useAtom } from "jotai";
import { userAtom } from "../atoms/AtomHelpers";
import { useMutation, useQueryClient } from "react-query";
import { Modal, Form, Input, Button, Switch, message, Space } from "antd";

function CreateChat(props) {
  const [user] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const [modalVisibility, setModalVisibility] = useState(false);
  const [, setDisplayChatroom] = useState(false);
  const [lng, setLng] = useState(-80.8315);
  const [lat, setLat] = useState(35.21);
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const addChatroomMutation = useMutation((newChatroom) => axios.post("/api/chatrooms/add", newChatroom), {
    onSuccess: async (data) => {
      message.success("Chatroom successfully created!");
      queryClient.setQueryData("globalChatrooms", data.data);
    },
  });

  const settingName = (e) => setName(e.target.value);
  const settingTags = (e) => setTags(e.target.value);
  const settingIsPrivate = (e) => setIsPrivate(e);
  const settingIsVerified = (e) => setIsVerified(e);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
    });

    navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
      permissionStatus.onchange = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLng(position.coords.longitude);
          setLat(position.coords.latitude);
        });
      };
    });
  }, []);

  const submitNewChatroom = () => {
    if (!name) {
      message.error("Please make sure to fill out each field");
      return;
    }

    setDisplayChatroom(true);

    let longitude_buffer_for_privacy = Math.random() * 0.05 * (Math.round(Math.random()) ? 1 : -1);
    let latitude_buffer_for_privacy = Math.random() * 0.05 * (Math.round(Math.random()) ? 1 : -1);

    addChatroomMutation.mutate({
      adminId: user._id,
      name: name,
      tags: tags,
      isPrivate: isPrivate,
      verifyUsers: isVerified,
      location: [lng + longitude_buffer_for_privacy, lat + latitude_buffer_for_privacy],
    });
    setModalVisibility(!modalVisibility);
    setName("");
    setTags("");
    setIsPrivate(false);
    setIsVerified(false);
  };

  const toggleModalVisibility = () => {
    setModalVisibility(!modalVisibility);
  };

  return (
    <>
      <Space />
      <div className="circleBase create-buttons-right" onClick={toggleModalVisibility}>
        <div className="outer-icon">
          <div className="inner-group-icon"></div>
        </div>
      </div>
      <Modal
        title="Create New Chatroom"
        centered
        visible={modalVisibility}
        onOk={() => setModalVisibility(false)}
        onCancel={() => setModalVisibility(false)}
        footer={[
          <Button key="submitNewChatroom" type="primary" onClick={() => submitNewChatroom()}>
            Submit
          </Button>,
        ]}
      >
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 10,
          }}
          layout="horizontal"
        >
          <Form.Item label="Chatroom Name">
            <Input onChange={settingName} name="chatroomName" value={name} />
          </Form.Item>
          <Form.Item label="Tags">
            <Input onChange={settingTags} name="tags" value={tags} />
          </Form.Item>
          <Form.Item label="Public/Private">
            <Switch onChange={settingIsPrivate} name="isPrivate" label="isPrivate" value={isPrivate} />
          </Form.Item>
          <Form.Item label="Anonymous/Verified">
            <Switch onChange={settingIsVerified} name="isVerified" label="isVerified" value={isVerified} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default CreateChat;
