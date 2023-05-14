import * as React from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import DialogGeneral, { dialogGeneralPropsDef } from "../../ui-component/mods/DialogGeneral";
import headers from "./components/headers";
import getRutas from "./components/rutas";


import FormDispositivo from "./components/formDispositivo";

function Dispositivo() {
  const rutas = getRutas();
  const [dispositivos, setDispositivos] = React.useState([]);

  const [dialogGeneral, setDialogGeneral] = React.useState(dialogGeneralPropsDef);
  const closeDialog = () => setDialogGeneral(dialogGeneralPropsDef);

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

  const delDispositivo = (idMovil) => {
    return rutas.delDispositivo((res) => {
      setDispositivos(res.dispositivos);
    }, { idMovil });
  };

  const formAddDispositivo = (selected) => (event) => {
    setDialogGeneral({
      open: true,
      title: "Agregar dispositivo",
      stage: FormDispositivo,
      accept: (data) => {
        addDispositivo(data);
        closeDialog();
      },
      close: closeDialog,
    });
  };

  const formEditDispositivo = (row) => {
    setDialogGeneral({
      open: true,
      title: "Editar dispositivo",
      propsstage: { row },
      stage: FormDispositivo,
      accept: (data) => {
        setDispositivo({ ...data, idMovil: row.idMovil });
        closeDialog();
      },
      close: closeDialog,
    });
  };

  const formDelDispositivo = (row) => {
    setDialogGeneral({
      open: true,
      title: "Eliminar dispositivo",
      accept: () => {
        delDispositivo(row.idMovil);
        closeDialog();
      },
      close: closeDialog,
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
            rowId="idMovil"
            rows={dispositivos}
            columns={headers.dispositivo}
            acciones={acciones}
            accionesFila={accionesFila}
            // activeSelect={true}
          />
        </Grid>
      </Grid>
      <DialogGeneral {...dialogGeneral} />
    </div>
  );
}

export default Dispositivo;
