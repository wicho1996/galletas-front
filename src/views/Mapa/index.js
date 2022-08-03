import * as React from "react";

import { Card, CardContent, CardActions, Typography } from '@mui/material';

import { Mapa, Marker } from "../../ui-component/Mapa";
import getRutas from "./components/rutas";

function MapaComponent() {
  const rutas = getRutas();

  const [markers, setMarkers] = React.useState([]);
  const [timer, setTimer] = React.useState(30);

  const getUbicaciones = () => {
    rutas.getUbicacionesDispositivos((res) => {
      const markers =  res.map((ubi) => {
        return <Marker key={`market${ubi.id_empleado}`} lat={ubi.lat} lon={ubi.lon} desc={ubi.nombre} />
      });
      setMarkers(markers);
    });
  }
  
  setTimeout(() => {
    const newTime = timer-1;
    if (timer == 1 || timer < -10) {
      setTimer(30);
      getUbicaciones();
      return;
    }
    setTimer(newTime);
    return;
  }, 1000);

  React.useEffect(() => {
    if (markers.length == 0) {
      getUbicaciones();
    }
  }, []);

  return (
    <Card>
      <CardContent>
        <Mapa zoom={13} markers={markers} />
      </CardContent>
      <CardActions>
      <Typography variant="h5" component="div" gutterBottom>
        {`Actualizar en: ${timer}s`}
      </Typography>
      </CardActions>
    </Card>
  );
}

export default MapaComponent;
