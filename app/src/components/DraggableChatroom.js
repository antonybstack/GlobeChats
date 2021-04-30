import React, { useState, useCallback } from "react";
import { Button, Layout, Breadcrumb } from "antd";
import { DraggableModal, DraggableModalProvider, DraggableModalProps } from "ant-design-draggable-modal";
import "antd/dist/antd.css";
import "ant-design-draggable-modal/dist/index.css";
import Chatroom from "./Chatroom";

const DraggableChatroom = (props) => {
  const [visible, setVisible] = useState(false);
  const onOk = useCallback(() => setVisible(true), []);
  const onCancel = useCallback(() => setVisible(false), []);
  const onToggle = useCallback(() => setVisible((v) => !v), []);
  return (
    <>
      <Button id="openChatroomBtn" onClick={onToggle} type={visible ? "secondary" : "primary"}>
        {visible ? "Close Chat Window" : "Open Chat Window"}
      </Button>
      <DraggableModal title="Chatrooms" visible={visible} onOk={onOk} onCancel={onCancel} {...props} initialWidth={800} initialHeight={500}>
        <Chatroom />
      </DraggableModal>
    </>
  );
};

export default DraggableChatroom;
