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
import { useAtom } from "jotai";
import { userAtom } from "../atoms/AuthAtom";
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from "react-query";
import { globalChatroomsAtom } from "../atoms/ChatroomAtom";

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
  const [user] = useAtom(userAtom);
  //const [globalChatrooms] = useAtom(globalChatroomsAtom);

  useEffect(() => {
    let arr = document.getElementsByClassName("mapPopup");
    for (var i = 0; i < arr.length; i++) {
      arr.item(i).style.display = "none";
    }
    if (selectedMarker != null) document.getElementsByClassName("mapPopup")[selectedMarker].style.display = "block";
  }, [selectedMarker]);

  const { status, data, error, isFetching } = useQuery("globalChatrooms", () =>
    axios
      .get("/api/chatrooms")
      .then((res) => res.data)
      .catch((err) => {
        console.log(err);
      })
  );

  console.log(status);
  console.log(data);
  console.log(error);
  console.log(isFetching);

  var globalChatrooms;

  if (status === "loading") return <span>Loading...</span>;
  if (status === "error") return <span>Error: {error.message}</span>;

  globalChatrooms = data.chatrooms;

  console.log(globalChatrooms);

  // const map = new mapboxgl.Map({
  //   container: mapContainer.current,
  //   style: "mapbox://styles/mapbox/streets-v11",
  //   center: [lng, lat],
  //   zoom: zoom,
  // });

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

  // map.on("move", () => {
  //   setLng(map.getCenter().lng.toFixed(4));
  //   setLat(map.getCenter().lat.toFixed(4));
  //   setZoom(map.getZoom().toFixed(2));
  // });

  // map.addControl(
  //   new mapboxgl.GeolocateControl({
  //     positionOptions: {
  //       enableHighAccuracy: true,
  //     },
  //     fitBoundsOptions: {
  //       maxZoom: 10.66,
  //     },
  //     showAccuracyCircle: false,
  //     showUserLocation: false,
  //     trackUserLocation: true,
  //   })
  // );

  // //var marker = new mapboxgl.Marker().setLngLat([-80.8431, 35.2271]).addTo(map);

  // if (globalChatrooms[0] != null) {
  //   map.on("load", function () {
  //     map.loadImage(profileIcon, function (error, image) {
  //       if (error) throw error;
  //       map.addImage("cat", image);
  //     });

  //     var feature = {};
  //     var features = [];
  //     feature.features = features;

  //     globalChatrooms.forEach((chatroom) => {
  //       var coord = [lng, lat];
  //       if (chatroom.location.length === 2) coord = [chatroom.location[0], chatroom.location[1]];
  //       let featuree = {
  //         type: "Feature",
  //         properties: {
  //           chatroom_id: chatroom._id,
  //           name: chatroom.name,
  //           tags: chatroom.tags,
  //           verifyUsers: chatroom.verifyUsers,
  //           isPrivate: chatroom.isPrivate,
  //           timestamp: chatroom.timestamp,
  //           current_user: user._id,
  //           icon: "cat",
  //         },
  //         geometry: {
  //           type: "Point",
  //           coordinates: coord,
  //         },
  //       };
  //       feature.features.push(featuree);
  //     });

  //     map.addSource("places", {
  //       // This GeoJSON contains features that include an "icon"
  //       // property. The value of the "icon" property corresponds
  //       // to an image in the Mapbox Streets style's sprite.
  //       type: "geojson",
  //       data: {
  //         type: "FeatureCollection",
  //         features: feature.features,
  //       },
  //     });
  //     // Add a layer showing the places.
  //     map.addLayer({
  //       id: "places",
  //       type: "symbol",
  //       source: "places",
  //       layout: {
  //         "icon-image": "{icon}",
  //         "icon-size": 0.3,
  //         "icon-allow-overlap": true,
  //       },
  //     });

  //     // When a click event occurs on a feature in the places layer, open a popup at the
  //     // location of the feature, with description HTML from its properties.
  //     map.on("click", "places", function (e) {
  //       var coordinates = e.features[0].geometry.coordinates.slice();
  //       var description = e.features[0].properties.description;

  //       // Ensure that if the map is zoomed out such that multiple
  //       // copies of the feature are visible, the popup appears
  //       // over the copy being pointed to.
  //       while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  //       }

  //       const popupNode = document.createElement("div");
  //       popupNode.style.cssText = "min-width:150px;min-height:120px;";
  //       ReactDOM.render(
  //         <Suspense fallback={<div>Loading...</div>}>
  //           <MapMarkerPopup feature={e.features[0].properties} />
  //         </Suspense>,
  //         popupNode
  //       );

  //       new mapboxgl.Popup().setLngLat(coordinates).setDOMContent(popupNode).addTo(map);
  //     });

  //     // Change the cursor to a pointer when the mouse is over the places layer.
  //     map.on("mouseenter", "places", function () {
  //       map.getCanvas().style.cursor = "pointer";
  //     });

  //     // Change it back to a pointer when it leaves.
  //     map.on("mouseleave", "places", function () {
  //       map.getCanvas().style.cursor = "";
  //     });
  //   });
  // }

  // setMarkersGenerated(true);

  // map.remove();

  const styleRef = "mapbox://styles/mapbox/streets-v11";

  const openPopup = (e, index) => {
    console.log(e);
    console.log(index);
    setSelectedMarker(index);
  };

  //

  // const CustomPopup = ({ index, marker, closePopup }) => {
  //   return (
  //     <Popup latitude={-80.73251789999999} longitude={35.308377899999996} onClose={closePopup} closeButton={true} closeOnClick={false} offsetTop={-30}>
  //       <p>test</p>
  //     </Popup>
  //   );
  // };

  // const CustomMarker = ({ index, marker, openPopup }) => {
  //   return (
  //     <Marker latitude={-80.73251789999999} longitude={35.308377899999996}>
  //       <div className="marker" onClick={() => openPopup(index)}>
  //         <span>
  //           <CustomPopup />
  //           <b>{index + 1}</b>
  //         </span>
  //       </div>
  //     </Marker>
  //   );
  // };
  var style3 = {
    backgroundImage: "url(" + profileIcon + ")",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div>
      {/* <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="map-container" ref={mapContainer} /> */}
      <MapGL
        style={styleRef}
        containerStyle={{
          height: "93.4vh",
          width: "100vw",
        }}
        center={[lng, lat]}
        zoom={[10]}
      >
        {globalChatrooms.map((chatroom, i) => {
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
    </div>
  );
};

export default Map;
