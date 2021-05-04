import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

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
  
  let evdate = (new Date(eventDate).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })) + " at " + (new Date(eventDate).toLocaleTimeString("en-US"));
  let loc = "Lat: " + location[1] + " Long: " + location[0];

  return (
    <>
      {globalEventsQuery.status === "loading event info" ? (
        <img className="loading" src="loading.gif" alt="loading..." />
      ) : (
        <div className="mapMarkerPopup">
          <div className="popupTitle">{title}</div>
          <div onClick={closePopup} className="popupCancelButton">
            x
          </div>
          <br />
          <div>
            <div style={style3}>Date: {evdate}</div>
            <div style={style3}>Description: {description}</div>
            <div style={style3}>Location: {loc}</div>
          </div>
        </div> 
      )}
    </>
  );
};

export default EventMarkerPopup;
