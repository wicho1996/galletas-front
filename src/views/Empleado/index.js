import * as React from "react";
import {
  Grid,
} from "@mui/material";
import { Folder } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import headers from "./components/headers";
import getRutas from "./components/rutas";

function Empleado() {
  const rutas = getRutas();
  const [empleados, setEmpleados] = React.useState([]);

  const getEmpleados = () => {
    rutas.getEmpleados(
      (res) => {
        setEmpleados(res);
      },
      { dat: "Hola" }
    );
  };

  React.useEffect(() => {
    getEmpleados();
  }, []);

  // Config
  const acciones = [
    { label: "Nuevo usuario", icon: <Folder />, click: () => {alert("Hola")} }
  ];
  const accionesFila = [
    { label: "Editar 1", click: (reg) => {console.log(reg);}, enabled: true },
    { label: "Editar 2", click: () => {}, enabled: true },
    { label: "Editar 3", click: () => {}, enabled: true },
  ];

  

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla tableName="Empleados" rowId="id_empleado" rows={empleados} columns={headers.empelado} acciones={acciones} accionesFila={accionesFila} />
        </Grid>
      </Grid>
    </div>
  );
}

export default Empleado;
