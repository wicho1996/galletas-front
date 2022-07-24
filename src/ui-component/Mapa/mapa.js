import * as React from "react";

import { PersonPin } from "@mui/icons-material";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";


function Mapa(props) {
  const { zoom, markers } = props;

  return (
    <div>
      <MapContainer
        center={[20.615218911574427, -100.41487109002732]}
        zoom={zoom}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers}
      </MapContainer>
    </div>
  );
}

export default Mapa;
