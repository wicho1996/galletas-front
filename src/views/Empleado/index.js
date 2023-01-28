import * as React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import DialogMod from "../../ui-component/mods/Dialog";
import headers from "./components/headers";
import getRutas from "./components/rutas";

import FormEmpelado from "./components/formEmpleado";
import { setMessage } from "../../reducers/actions/UIMessageActions";

function Empleado() {
  const rutas = getRutas();
  const [empleados, setEmpleados] = React.useState([]);
  const [dialog, setDialog] = React.useState({});

  const state = useSelector(state => state);
  const dispatch = useDispatch();

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
      dispatch(setMessage(res.estatus, res.mensaje));
      setEmpleados(res.empleados);
    }, empleado);
  };

  const delEmpleado = (id_empleado) => {
    return rutas.delEmpleado((res) => {
      setEmpleados(res.empleados);
    }, { id_empleado });
  };

  const formAddEmpleado = (selected) => (event) => {
    setDialog({
      open: true,
      title: "Agregar empelado",
      component: (
        <FormEmpelado
          accept={(data) => {
            addEmpleado(data);
            setDialog({});
          }}
          close={() => setDialog({})}
        />
      ),
    });
  };

  const formEditEmpleado = (row) => {
    setDialog({
      open: true,
      title: "Editar empelado",
      component: (
        <FormEmpelado
          row={row}
          accept={(data) => {
            setEmpleado({ ...data, id_empleado: row.id_empleado });
            setDialog({});
          }}
          close={() => setDialog({})}
        />
      ),
    });
  };

  const formDelEmpleado = (row) => {
    setDialog({
      open: true,
      title: "Eliminar empleado",
      component: (
        <div>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Eliminar empleado !!!
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog({})}>Cancelar</Button>
            <Button onClick={() => {
              delEmpleado(row.id_empleado);
              setDialog({});
            }}>Aceptar</Button>
          </DialogActions>
        </div>
      ),
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
      <DialogMod {...dialog}>{dialog.component}</DialogMod>
      {state}
    </div>
  );
}

export default Empleado;
