import React, { useState, useCallback } from "react";
import { Button } from "antd";
import { DraggableModal } from "ant-design-draggable-modal";
import "antd/dist/antd.css";
import "ant-design-draggable-modal/dist/index.css";
import { MinusOutlined } from "@ant-design/icons";
import Chatroom from "./Chatroom";

const DraggableChatroom = (props) => {
  const [visible, setVisible] = useState(false);
  const onOk = useCallback(() => setVisible(true), []);
  const onCancel = useCallback(() => setVisible(false), []);
  const onToggle = useCallback(() => setVisible((v) => !v), []);

  // const content = <MinusOutlined />;

  return (
    <>
      <Button id="openChatroomBtn" onClick={onToggle} type={visible ? "secondary" : "primary"}>
        {visible ? "Close Chat Window" : "Open Chat Window"}
      </Button>
      <DraggableModal
        closeIcon={<MinusOutlined style={{ fontSize: "1.2em" }} />}
        class="draggableChatroom"
        title="Chatrooms"
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        {...props}
        initialWidth={800}
        initialHeight={500}
      >
        <Chatroom />
      </DraggableModal>
    </>
  );
};

export default DraggableChatroom;
