import * as React from "react";

import { Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

function Mark(props) {
  const { lat, lon, desc } = props;

  return (
    <Marker
      position={[lat, lon]}
      icon={
        new Icon({
          iconUrl: markerIconPng,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    >
      <Popup>{desc}</Popup>
    </Marker>
  );
}

export default Mark;
