import * as React from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import DialogMod from "../../ui-component/mods/Dialog";
import headers from "./components/headers";
import getRutas from "./components/rutas";

import FormDispositivo from "./components/formDispositivo";

function Dispositivo() {
  const rutas = getRutas();
  const [dispositivos, setDispositivos] = React.useState([]);
  const [dialog, setDialog] = React.useState({});

  React.useEffect(() => {
    getDispositivos();
  }, []);

  const getDispositivos = () => {
    return rutas.getDispositivos(
      (res) => {
        setDispositivos(res);
      },
      { dat: "Hola" }
    );
  };

  const addDispositivo = (dispositivo) => {
    return rutas.addDispositivo((res) => {
      setDispositivos(res.dispositivos);
    }, dispositivo);
  };

  const setDispositivo = (dispositivo) => {
    return rutas.setDispositivo((res) => {
      setDispositivos(res.dispositivos);
    }, dispositivo);
  };

  const delDispositivo = (id_movil) => {
    return rutas.delDispositivo((res) => {
      setDispositivos(res.dispositivos);
    }, { id_movil });
  };

  const formAddDispositivo = (selected) => (event) => {
    setDialog({
      open: true,
      title: "Agregar dispositivo",
      component: (
        <FormDispositivo
          accept={(data) => {
            addDispositivo(data);
            setDialog({});
          }}
          close={() => setDialog({})}
        />
      ),
    });
  };

  const formEditDispositivo = (row) => {
    setDialog({
      open: true,
      title: "Editar dispositivo",
      component: (
        <FormDispositivo
          row={row}
          accept={(data) => {
            setDispositivo({ ...data, id_movil: row.id_movil });
            setDialog({});
          }}
          close={() => setDialog({})}
        />
      ),
    });
  };

  const formDelDispositivo = (row) => {
    setDialog({
      open: true,
      title: "Eliminar dispositivo",
      component: (
        <div>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Eliminar dispositivo !!!
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog({})}>Cancelar</Button>
            <Button onClick={() => {
              delDispositivo(row.id_movil);
              setDialog({});
            }}>Aceptar</Button>
          </DialogActions>
        </div>
      ),
    });
  };

  // Config
  const acciones = [
    { label: "Nuevo dispositivo", icon: <PersonAdd />, click: formAddDispositivo },
  ];
  const accionesFila = [
    { label: "Editar", click: formEditDispositivo, enabled: true },
    { label: "Eliminar", click: formDelDispositivo, enabled: true }
  ];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla
            tableName="Dispositivo"
            rowId="id_movil"
            rows={dispositivos}
            columns={headers.dispositivo}
            acciones={acciones}
            accionesFila={accionesFila}
            // activeSelect={true}
          />
        </Grid>
      </Grid>
      <DialogMod {...dialog}>{dialog.component}</DialogMod>
    </div>
  );
}

export default Dispositivo;
