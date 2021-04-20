import React, { useEffect, useContext, useState, useRef, Component } from "react";
import mapboxgl from "mapbox-gl/dist/mapbox-gl-csp";
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from "worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker";
import profileIcon from "../assets/users1.png";
import { ChatroomContext } from "../contexts/ChatroomContext";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = "pk.eyJ1IjoibXJvc3NpNCIsImEiOiJja2x3bGM3OXgwMWI1MnFudjdwZDNoN2RuIn0.Ny-kDL7ny_0OmzPf7ZZtVA";

const Map = () => {
  const mapContainer = useRef();
  const [lng, setLng] = useState(-80.8315);
  const [lat, setLat] = useState(35.21);
  const [zoom, setZoom] = useState(10.66);
  const { globalChatrooms, setGlobalChatrooms } = useContext(ChatroomContext);
  console.log(globalChatrooms);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      setLng(position.coords.longitude);
      setLat(position.coords.latitude);
      map.setCenter([position.coords.longitude, position.coords.latitude]);
    });

    navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
      permissionStatus.onchange = function () {
        navigator.geolocation.getCurrentPosition(function (position) {
          map.setCenter([position.coords.longitude, position.coords.latitude]);
        });
      };
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        fitBoundsOptions: {
          maxZoom: 10.66,
        },
        showAccuracyCircle: false,
        showUserLocation: false,
        trackUserLocation: true,
      })
    );

    //var marker = new mapboxgl.Marker().setLngLat([-80.8431, 35.2271]).addTo(map);

    map.on("load", function () {
      map.loadImage(profileIcon, function (error, image) {
        if (error) throw error;

        // Add the image to the map style.
        map.addImage("cat", image);

        // Add a data source containing one point feature.

        // Add a layer to use the image to represent the data.
        // map.addLayer({
        //   id: "points",
        //   type: "symbol",
        //   source: "point", // reference the data source
        //   layout: {
        //     "icon-image": "cat", // reference the image
        //     "icon-size": 0.25,
        //   },
        // });
      });

      var feature = {};
      var features = [];
      feature.features = features;
      console.log(feature);
      console.log(globalChatrooms);
      globalChatrooms.forEach((chatroom) => {
        console.log(chatroom);
        var coord = [lng, lat];
        console.log(coord);
        console.log(chatroom.location[0]);
        console.log(chatroom.location[1]);
        if (chatroom.location.length === 2) coord = [chatroom.location[0], chatroom.location[1]];
        console.log(coord);
        let featuree = {
          type: "Feature",
          properties: {
            description:
              '<div style="font-size:18pt;font-weight:bold;">Test_Chatroom</div><p style="font-size: 15pt;"><button className="joinChatroomButton" onClick={joinChatroom()}>Click to join</button></p><p><div style="font-size: 12pt;">tags</div></p>',
            icon: "cat",
          },
          geometry: {
            type: "Point",
            coordinates: coord,
          },
        };
        feature.features.push(featuree);
      });
      console.log(feature.features);

      map.addSource("places", {
        // This GeoJSON contains features that include an "icon"
        // property. The value of the "icon" property corresponds
        // to an image in the Mapbox Streets style's sprite.
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: feature.features,
        },
      });
      // Add a layer showing the places.
      map.addLayer({
        id: "places",
        type: "symbol",
        source: "places",
        layout: {
          "icon-image": "{icon}",
          "icon-size": 0.3,
          "icon-allow-overlap": true,
        },
      });

      // When a click event occurs on a feature in the places layer, open a popup at the
      // location of the feature, with description HTML from its properties.
      map.on("click", "places", function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup().setLngLat(coordinates).setHTML(description).addTo(map);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.on("mouseenter", "places", function () {
        map.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.on("mouseleave", "places", function () {
        map.getCanvas().style.cursor = "";
      });
    });

    return () => map.remove();
  }, [globalChatrooms]);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div className="map-container" ref={mapContainer} />
    </div>
  );
};

export default Map;
