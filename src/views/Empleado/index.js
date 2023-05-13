import * as React from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import DialogGeneral, { dialogGeneralPropsDef } from "../../ui-component/mods/DialogGeneral";
import headers from "./components/headers";
import getRutas from "./components/rutas";

import FormEmpelado from "./components/formEmpleado";

function Empleado() {
  const rutas = getRutas();
  const [empleados, setEmpleados] = React.useState([]);

  const [dialogGeneral, setDialogGeneral] = React.useState(dialogGeneralPropsDef);
  const closeDialog = () => setDialogGeneral(dialogGeneralPropsDef);

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

  const addEmpleado = (empleado) => {
    return rutas.addEmpleado((res) => {
      setEmpleados(res.empleados);
    }, empleado);
  };

  const setEmpleado = (empleado) => {
    return rutas.setEmpleado((res) => {
      setEmpleados(res.empleados);
    }, empleado);
  };

  const delEmpleado = (id_empleado) => {
    return rutas.delEmpleado((res) => {
      setEmpleados(res.empleados);
    }, { id_empleado });
  };

  const formAddEmpleado = (selected) => (event) => {
    setDialogGeneral({
      open: true,
      title: "Agregar empelado",
      stage: FormEmpelado,
      accept: (data) => {
        addEmpleado(data);
        closeDialog();
      },
      close: closeDialog,
    });
  };

  const formEditEmpleado = (row) => {
    setDialogGeneral({
      open: true,
      title: "Editar empelado",
      propsstage: { row },
      stage: FormEmpelado,
      accept: (data) => {
        setEmpleado({ ...data, id_empleado: row.id_empleado });
        closeDialog();
      },
      close: closeDialog,
    });
  };

  const formDelEmpleado = (row) => {
    setDialogGeneral({
      open: true,
      title: "Eliminar empleado",
      accept: () => {
        delEmpleado(row.id_empleado);
        closeDialog();
      },
      close: closeDialog,
    });
  };

  // Config
  const acciones = [
    { label: "Nuevo usuario", icon: <PersonAdd />, click: formAddEmpleado },
  ];
  const accionesFila = [
    { label: "Editar", click: formEditEmpleado, enabled: true },
    { label: "Eliminar", click: formDelEmpleado, enabled: true },
  ];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla
            tableName="Empleados"
            rowId="id_empleado"
            rows={empleados}
            columns={headers.empelado}
            acciones={acciones}
            accionesFila={accionesFila}
            activeSelect={true}
          />
        </Grid>
      </Grid>
      <DialogGeneral {...dialogGeneral} />
    </div>
  );
}

export default Empleado;
