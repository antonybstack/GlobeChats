import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { message, Button, Form, Input, Switch, Divider } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

const EventMarkerPopup = (props) => {
  const { title, description, location, eventDate } = props.feature.event;

  const globalEventsQuery = useQuery("globalEvents", () =>
    axios
      .get("/api/events")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      })
  );

  const closePopup = () => {
    let arr = document.getElementsByClassName("mapEventPopup");
    for (var i = 0; i < arr.length; i++) {
      arr.item(i).style.display = "none";
    }
    props.setSelectedMarker(null);
  };

  var style3 = { fontSize: "10pt" };

  let evdate = new Date(eventDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }) + " at " + new Date(eventDate).toLocaleTimeString("en-US");
  let loc = "Long: " + location[0] + " Lat: " + location[1];

  return (
    <>
      {globalEventsQuery.status === "loading event info" ? (
        <img className="loading" src="loading.gif" alt="loading..." />
      ) : (
        // <div className="mapMarkerPopup">
        //   <div className="popupTitle">{title}</div>
        //   <div onClick={closePopup} className="popupCancelButton">
        //     x
        //   </div>
        //   <br />
        //   <div>
        //     <div style={style3}>Date: {evdate}</div>
        //     <div style={style3}>Description: {description}</div>
        //     <div style={style3}>Location: {loc}</div>
        //   </div>
        // </div>
        <div className="mapMarkerPopup">
          <div className="popupTitle">{title}</div>
          <div onClick={closePopup} className="popupCancelButton">
            <CloseCircleFilled style={{ fontSize: "1em", padding: ".25em", paddingLeft: ".5em", color: "#a0a0a0" }} />
          </div>
          <Divider style={{ marginTop: "10px", marginBottom: "10px" }} />
          <div>
            <div style={style3}>Date:&nbsp;&nbsp;&nbsp;{evdate}</div>
            <div style={style3}>Description:&nbsp;&nbsp;&nbsp;{description}</div>
            <div style={style3}>Location:&nbsp;&nbsp;&nbsp;{loc}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventMarkerPopup;
