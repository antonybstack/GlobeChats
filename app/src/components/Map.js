import React, { useEffect, useState } from "react";
import axios from "axios";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import ReactMapboxGl, { Marker, Popup } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import MapMarkers from "./MapMarkers";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = "pk.eyJ1IjoibXJvc3NpNCIsImEiOiJja2x3bGM3OXgwMWI1MnFudjdwZDNoN2RuIn0.Ny-kDL7ny_0OmzPf7ZZtVA";

const MapGL = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibXJvc3NpNCIsImEiOiJja2x3bGM3OXgwMWI1MnFudjdwZDNoN2RuIn0.Ny-kDL7ny_0OmzPf7ZZtVA",
});

var arrr = [-80.8315, 35.21];
const zoom = [10];
const pitch = [50];

navigator.geolocation.getCurrentPosition(function (position) {
  arrr = [position.coords.longitude, position.coords.latitude];
});

navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
  permissionStatus.onchange = function () {
    navigator.geolocation.getCurrentPosition(function (position) {
      arrr = [position.coords.longitude, position.coords.latitude];
    });
  };
});

const Map = () => {
  const styleRef = "mapbox://styles/mapbox/streets-v11";
  return (
    <>
      <MapGL
        style={styleRef}
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        center={arrr}
        zoom={zoom}
        pitch={pitch}
      >
        <MapMarkers />
      </MapGL>
    </>
  );
};

export default Map;
