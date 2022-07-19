import * as React from "react";
import { Grid } from "@mui/material";
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

  const formAddDispositivo = (selected) => (event) => {
    setDialog({
      open: true,
      title: "Agregar dispositivo",
      component: (
        <FormDispositivo
          accept={(data) => console.log(data)}
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
          accept={(data) => console.log(data)}
          close={() => setDialog({})}
        />
      ),
    });
  };

  // Config
  const acciones = [
    { label: "Nuevo dispositivo", icon: <PersonAdd />, click: formAddDispositivo },
  ];
  const accionesFila = [{ label: "Editar", click: formEditDispositivo, enabled: true, }];

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
