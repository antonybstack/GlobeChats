import React, { useEffect, useContext, useState, useRef, Suspense } from "react";
import axios from "axios";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import ReactMapboxGl, { Layer, Marker, Popup, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import profileIcon from "../assets/chat-group.png";
import MapMarkerPopup from "./MapMarkerPopup";
import AuthProvider from "../contexts/AuthContext";
import { AuthContext } from "../contexts/AuthContext";
// import { ChatroomContext } from "../contexts/ChatroomContext";
import { useQuery } from "react-query";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = "pk.eyJ1IjoibXJvc3NpNCIsImEiOiJja2x3bGM3OXgwMWI1MnFudjdwZDNoN2RuIn0.Ny-kDL7ny_0OmzPf7ZZtVA";

const MapGL = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibXJvc3NpNCIsImEiOiJja2x3bGM3OXgwMWI1MnFudjdwZDNoN2RuIn0.Ny-kDL7ny_0OmzPf7ZZtVA",
});

const Map = () => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(-80.8315);
  const [lat, setLat] = useState(35.21);
  const [zoom, setZoom] = useState(10.66);
  const [markersGenerated, setMarkersGenerated] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  //const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);
  //const { globalChatrooms, setGlobalChatrooms, globalChatroomsLoaded } = useContext(ChatroomContext);
  // const [user] = useAtom(userAtom);
  //const [globalChatrooms] = useAtom(globalChatroomsAtom);

  const globalChatroomsQuery = useQuery("globalChatrooms", () =>
    axios
      .get("/api/chatrooms")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      })
  );

  useEffect(() => {
    let arr = document.getElementsByClassName("mapPopup");
    for (var i = 0; i < arr.length; i++) {
      arr.item(i).style.display = "none";
    }
    if (selectedMarker != null) document.getElementsByClassName("mapPopup")[selectedMarker].style.display = "block";
  }, [selectedMarker]);

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

  const styleRef = "mapbox://styles/mapbox/streets-v11";

  const openPopup = (e, index) => {
    setSelectedMarker(index);
  };

  var style3 = {
    backgroundImage: "url(" + profileIcon + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <>
      {globalChatroomsQuery.status === "loading" ? (
        <div>Loading global chatrooms... </div>
      ) : (
        <MapGL
          style={styleRef}
          containerStyle={{
            height: "93vh",
            width: "100vw",
          }}
          center={[lng, lat]}
          zoom={[10]}
        >
          {globalChatroomsQuery.data.chatrooms.map((chatroom, i) => {
            let props = {
              chatroom: chatroom,
              index: i,
            };
            return (
              <>
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
                  <MapMarkerPopup feature={props} setSelectedMarker={setSelectedMarker} />
                </Popup>
                <Marker coordinates={[chatroom.location[0], chatroom.location[1]]}>
                  <div className="marker" onClick={(e) => openPopup(e, i)}>
                    <span>
                      <div className="map-marker-container" style={style3}></div>
                    </span>
                  </div>
                </Marker>
              </>
            );
          })}
          {/* <CustomMarker key={`marker-${1}`} index={1} marker={1} openPopup={openPopup} /> */}
        </MapGL>
      )}
    </>
  );
};

export default Map;
