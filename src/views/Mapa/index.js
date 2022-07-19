import * as React from "react";

import { PersonPin } from "@mui/icons-material";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'


function Mapa() {
  // const rutas = getRutas();

  

  return (
    <div>
      <MapContainer center={[20.615218911574427, -100.41487109002732]} zoom={13} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[20.589185586065916, -100.38673614324452]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
        <Popup>
          Este es un popo up personalizado
        </Popup>
      </Marker>
    </MapContainer>
    </div>
  );
}

export default Mapa;
