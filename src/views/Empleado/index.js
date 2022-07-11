import * as React from "react";
import {
  Grid,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import DialogMod from "../../ui-component/mods/Dialog";
import headers from "./components/headers";
import getRutas from "./components/rutas";

import FormEmpelado from "./components/formEmpleado";

function Empleado() {
  const rutas = getRutas();
  const [empleados, setEmpleados] = React.useState([]);
  const [dialog, setDialog] = React.useState({});

  React.useEffect(() => {
    getEmpleados();
  }, []);

  const getEmpleados = () => {
    return rutas.getEmpleados(
      (res) => {
        setEmpleados(res);
      },
      { dat: "Hola" }
    );
  };

  const formAddEmpleado = (selected) => (event) => {
    setDialog({
      open: true,
      title: 'Agregar empelado',
      component: <FormEmpelado />,
      accept: () => alert("hola"),
      close: () => setDialog({})
    });
  }  

  // Config
  const acciones = [
    { label: "Nuevo usuario", icon: <PersonAdd />, click: formAddEmpleado }
  ];
  const accionesFila = [
    { label: "Editar", click: (reg) => {console.log(reg);}, enabled: true },
  ];

  

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla tableName="Empleados" rowId="id_empleado" rows={empleados} columns={headers.empelado} acciones={acciones} accionesFila={accionesFila} activeSelect={true} />
        </Grid>
      </Grid>
      <DialogMod {...dialog}>
        {dialog.component}
      </DialogMod>
    </div>
  );
}

export default Empleado;
