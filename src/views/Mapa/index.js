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

  if (timer == 0 || timer < -10) {
    setTimer(30);
    getUbicaciones();
  }


  React.useEffect(() => {
    if (markers.length == 0) {
      getUbicaciones();
    }

    const superTimer = setInterval(() => {
      setTimer(prevCount => prevCount -1);
    }, 1000);
    return () => clearInterval(superTimer);

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
