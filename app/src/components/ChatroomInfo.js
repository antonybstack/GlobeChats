import React, { useEffect, useState } from "react";
import { SettingTwoTone, InfoCircleTwoTone } from "@ant-design/icons";
import { Modal, Form, Input, Button, Switch, message, Space, Label } from "antd";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/AtomHelpers";
import axios from "axios";

function ChatroomInfo({ props }) {
  const { isAdminOfCurrentChatroom, chatroom } = props;
  const queryClient = useQueryClient();
  const [user] = useAtom(userAtom);
  const [detailsModalVisibility, setDetailsModalVisibility] = useState(false);
  const [settingsModalVisibility, setSettingsModalVisibility] = useState(false);

  const [currentChatroom, setCurrentChatroom] = useState(null);
  useEffect(() => {
    axios
      .get("/api/chatrooms/" + chatroom._id)
      .then((res) => {
        console.log(res.data.chatroom);
        setCurrentChatroom(res.data.chatroom);
        setName(res.data.chatroom.name);
        setTags(res.data.chatroom.tags);
        setIsPrivate(res.data.chatroom.isPrivate);
        setIsVerified(res.data.chatroom.verifyUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const settingName = (e) => setName(e.target.value);
  const settingTags = (e) => setTags(e.target.value);
  const settingIsPrivate = (e) => setIsPrivate(e);
  const settingIsVerified = (e) => setIsVerified(e);

  const updateChatroomMutation = useMutation((updatedChatroom) => axios.put("/api/chatrooms/update/" + updatedChatroom._id, updatedChatroom), {
    onSuccess: async (data) => {
      message.success("Chatroom successfully updated!");
      setCurrentChatroom(data.data.chatroom);
      axios
        .get("/api/chatrooms/joined/" + user.joinedChatroomIds)
        .then((res) => {
          queryClient.setQueryData("chatrooms", res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      axios
        .get("/api/chatrooms")
        .then((res) => {
          queryClient.setQueryData("globalChatrooms", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  const openChatroomDetails = () => {
    setDetailsModalVisibility(!detailsModalVisibility);
  };

  const openChatroomSettings = () => {
    setSettingsModalVisibility(!settingsModalVisibility);
  };

  const updateChatroom = () => {
    if (!name) {
      message.error("Please make sure to fill out each field");
      return;
    }

    updateChatroomMutation.mutate({
      _id: currentChatroom._id,
      adminId: user._id,
      name: name,
      tags: tags,
      isPrivate: isPrivate,
      verifyUsers: isVerified,
    });
    setSettingsModalVisibility(!settingsModalVisibility);
  };

  return (
    <>
      <Space />
      {isAdminOfCurrentChatroom ? (
        <div className="chatroomDetails">
          Chatroom Settings
          <SettingTwoTone onClick={openChatroomSettings} twoToneColor="#ffa500" style={{ fontSize: "1.25em", paddingLeft: "1em" }} />
        </div>
      ) : (
        <div className="chatroomDetails">
          Chatroom Details
          <InfoCircleTwoTone onClick={openChatroomDetails} style={{ fontSize: "1.25em", paddingLeft: "1.5em" }} />
        </div>
      )}
      <Modal
        title="Chatroom Details"
        centered
        visible={detailsModalVisibility}
        mask={false}
        onOk={() => setDetailsModalVisibility(false)}
        onCancel={() => setDetailsModalVisibility(false)}
        footer={[
          <Button key="closeChatroomDetails" size="small" type="secondary" onClick={() => setDetailsModalVisibility(false)}>
            Close
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
          <Form.Item label="Chatroom name">
            <Input onChange={settingName} name="chatroomName" value={name} disabled />
          </Form.Item>
          <Form.Item label="Tags">
            <Input onChange={settingTags} name="tags" value={tags} disabled />
          </Form.Item>
          <Form.Item label="Public/Private">
            <Switch onChange={settingIsPrivate} name="isPrivate" label="isPrivate" checked={isPrivate} disabled />
          </Form.Item>
          <Form.Item label="Anonymous/Verified">
            <Switch onChange={settingIsVerified} name="isVerified" label="isVerified" checked={isVerified} disabled />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Chatroom Settings"
        centered
        visible={settingsModalVisibility}
        mask={false}
        onOk={() => setSettingsModalVisibility(false)}
        onCancel={() => setSettingsModalVisibility(false)}
        footer={[
          <Button key="submitUpdatedChatroom" type="primary" onClick={() => updateChatroom()}>
            Submit
          </Button>,

          <Button key="closeChatroomSettings" size="small" type="secondary" onClick={() => setSettingsModalVisibility(false)}>
            Close
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
          <Form.Item label="Chatroom name">
            <Input onChange={settingName} name="chatroomName" value={name} />
          </Form.Item>
          <Form.Item label="Tags">
            <Input onChange={settingTags} name="tags" value={tags} />
          </Form.Item>
          <Form.Item label="Public/Private">
            <Switch onChange={settingIsPrivate} name="isPrivate" label="isPrivate" checked={isPrivate} />
          </Form.Item>
          <Form.Item label="Anonymous/Verified">
            <Switch onChange={settingIsVerified} name="isVerified" label="isVerified" checked={isVerified} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ChatroomInfo;
