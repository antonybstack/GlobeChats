import React, { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import chatGroupImage from "../assets/chat-group-filled-75px.png";
import calendarImage from "../assets/event_calendar_75px.png";
import MapMarkerPopup from "./MapMarkerPopup";
import EventMarkerPopup from "./EventMarkerPopup";
import { useAtom } from "jotai";
import { loading } from "../atoms/AtomHelpers";
import { useQuery } from "react-query";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = "pk.eyJ1IjoibXJvc3NpNCIsImEiOiJja2x3bGM3OXgwMWI1MnFudjdwZDNoN2RuIn0.Ny-kDL7ny_0OmzPf7ZZtVA";

const MapMarkers = () => {
  const [selectedChatroomMarker, setSelectedChatroomMarker] = useState(null);
  const [selectedEventMarker, setSelectedEventMarker] = useState(null);
  const [, setIsLoading] = useAtom(loading);

  const globalChatroomsQuery = useQuery("globalChatrooms", () =>
    axios
      .get("/api/chatrooms")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      })
  );

  const globalEventsQuery = useQuery("globalEvents", () =>
    axios
      .get("/api/events")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      })
  );

  useEffect(() => {
    console.log(selectedEventMarker);
    let arr = document.getElementsByClassName("mapPopup");
    for (var i = 0; i < arr.length; i++) {
      arr.item(i).style.display = "none";
    }

    arr = document.getElementsByClassName("mapEventPopup");
    for (i = 0; i < arr.length; i++) {
      arr.item(i).style.display = "none";
    }

    if (selectedChatroomMarker != null) document.getElementsByClassName("mapPopup")[selectedChatroomMarker].style.display = "block";
    if (selectedEventMarker != null) document.getElementsByClassName("mapEventPopup")[selectedEventMarker].style.display = "block";
  }, [selectedChatroomMarker, selectedEventMarker]);

  const openPopup = (e, index) => {
    setSelectedChatroomMarker(index);
  };

  const openEventPopup = (e, index) => {
    console.log("@@##########@@@");
    console.log(index);
    setSelectedEventMarker(index);
  };

  var style3 = {
    backgroundImage: "url(" + chatGroupImage + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  var eventStyle = {
    backgroundImage: "url(" + calendarImage + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    if (globalChatroomsQuery.status === "loading") setIsLoading(true);
    else setIsLoading(false);
  }, [globalChatroomsQuery.status, setIsLoading]);

  useEffect(() => {
    if (globalEventsQuery.status === "loading") setIsLoading(true);
    else setIsLoading(false);
  }, [globalEventsQuery.status, setIsLoading]);

  return (
    <>
      {globalChatroomsQuery.status === "loading" ? null : (
        <>
          {globalChatroomsQuery.data
            ? globalChatroomsQuery.data.chatrooms.map((chatroom, i) => {
                let props = {
                  chatroom: chatroom,
                  index: i,
                };
                return (
                  <React.Fragment key={i}>
                    <Popup
                      key={i}
                      tipSize={5}
                      anchor="bottom-right"
                      coordinates={[chatroom.location[0], chatroom.location[1]]}
                      offset={{
                        "bottom-left": [10, -20],
                        "bottom-right": [-10, -20],
                      }}
                      // onClick={closePopup}
                      tabIndex={i}
                      className="mapPopup"
                      style={{ display: "none", zIndex: "4" }}
                    >
                      <MapMarkerPopup feature={props} setSelectedMarker={setSelectedChatroomMarker} />
                    </Popup>
                    <Marker coordinates={[chatroom.location[0], chatroom.location[1]]}>
                      <div className="marker" onClick={(e) => openPopup(e, i)}>
                        <span>
                          <div className="map-marker-container" style={style3}></div>
                        </span>
                      </div>
                    </Marker>
                  </React.Fragment>
                );
              })
            : null}
        </>
      )}
      {globalEventsQuery.status === "loading" ? null : (
        <>
          {globalEventsQuery.data
            ? globalEventsQuery.data.events.map((event, i) => {
                let props = {
                  event: event,
                  index: i,
                };
                return (
                  <React.Fragment key={i}>
                    <Popup
                      key={i}
                      tipSize={5}
                      anchor="bottom-right"
                      coordinates={[event.location[0], event.location[1]]}
                      offset={{
                        "bottom-left": [10, -20],
                        "bottom-right": [-10, -20],
                      }}
                      tabIndex={i}
                      className="mapEventPopup"
                      style={{ display: "none", zIndex: "4" }}
                    >
                      <EventMarkerPopup feature={props} setSelectedMarker={setSelectedEventMarker} />
                    </Popup>
                    <Marker coordinates={[event.location[0], event.location[1]]}>
                      <div className="marker" onClick={(e) => openEventPopup(e, i)}>
                        <span>
                          <div className="map-marker-container" style={eventStyle}></div>
                        </span>
                      </div>
                    </Marker>
                  </React.Fragment>
                );
              })
            : null}
        </>
      )}
    </>
  );
};

export default MapMarkers;
