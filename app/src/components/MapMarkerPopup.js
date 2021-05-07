import React from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/AtomHelpers";
import { useQuery, useMutation } from "react-query";
import { message, Button, Form, Input, Switch, Divider } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import moment from "moment";

const MapMarkerPopup = (props) => {
  const [user, setUser] = useAtom(userAtom);

  //const [globalChatrooms] = useAtom(globalChatroomsAtom);
  const { _id, name, tags, verifyUsers, isPrivate, timestamp } = props.feature.chatroom;
  console.log(props.feature.chatroom.timestamp);
  console.log(moment(props.feature.chatroom.timestamp).format("DD/MM/YYYY"));

  const joinChatroomMutation = useMutation((newChatroom) => axios.put("/api/users/joinchatroom/" + user._id, newChatroom), {
    onSuccess: async (data) => {
      setUser(data.data.user);
    },
  });

  const globalChatroomsQuery = useQuery("globalChatrooms", () =>
    axios
      .get("/api/chatrooms")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      })
  );

  function joinChatroom() {
    if (_id) {
      joinChatroomMutation.mutate({ chatroom_id: _id });
    }
  }

  const closePopup = () => {
    let arr = document.getElementsByClassName("mapPopup");
    for (var i = 0; i < arr.length; i++) {
      arr.item(i).style.display = "none";
    }
    props.setSelectedMarker(null);
  };

  var style3 = { fontSize: "10pt" };

  let pri = isPrivate.toString();
  let ver = verifyUsers.toString();

  return (
    <>
      {globalChatroomsQuery.status === "loading chatroom info" ? (
        <img className="loading" src="loading.gif" alt="loading..." />
      ) : (
        // <Card title={name} bordered={false} style={{ width: 300 }}>
        //   <div style={style3}>Private: {pri}</div>
        //   <div style={style3}>Verified Users: {ver}</div>
        //   <div style={style3}>Tags: {tags}</div>
        //   <div style={style3}>Created: {timestamp}</div>
        // </Card>
        <div className="mapMarkerPopup">
          <div className="popupTitle">{name}</div>
          <div onClick={closePopup} className="popupCancelButton">
            <CloseCircleFilled style={{ fontSize: "1em", padding: ".25em", paddingLeft: ".5em", color: "#a0a0a0" }} />
          </div>
          <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
          <Button style={{ width: "calc(100% - 15px)", marginBottom: "5px" }} className="joinChatroomBtn" type="primary" size="small" onClick={joinChatroom}>
            <p>Click to join</p>
          </Button>
          <div>
            <div style={style3}>Tags: {tags}</div>
            <div style={style3}>Private: {pri}</div>
            <div style={style3}>Verified Users: {ver}</div>
            <div style={style3}>Created: {moment(timestamp).format("DD/MM/YYYY")}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MapMarkerPopup;
