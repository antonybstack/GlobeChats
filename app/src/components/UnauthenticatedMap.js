import React, { useState } from "react";

import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
import ReactMapboxGl from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = "pk.eyJ1IjoibXJvc3NpNCIsImEiOiJja2x3bGM3OXgwMWI1MnFudjdwZDNoN2RuIn0.Ny-kDL7ny_0OmzPf7ZZtVA";

const MapGL = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibXJvc3NpNCIsImEiOiJja2x3bGM3OXgwMWI1MnFudjdwZDNoN2RuIn0.Ny-kDL7ny_0OmzPf7ZZtVA",
});

const Map = () => {
  const [lng] = useState(-80.8315);
  const [lat] = useState(35.21);

  const styleRef = "mapbox://styles/mapbox/streets-v11";

  return (
    <div>
      <MapGL
        style={styleRef}
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        center={[lng, lat]}
        zoom={[10]}
        pitch={[50]}
      ></MapGL>
    </div>
  );
};

export default Map;
