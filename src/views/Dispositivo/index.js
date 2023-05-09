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

  const delDispositivo = (id_movil) => {
    return rutas.delDispositivo((res) => {
      setDispositivos(res.dispositivos);
    }, { id_movil });
  };

  const formAddDispositivo = (selected) => (event) => {
    setDialogGeneral({
      open: true,
      title: "Agregar dispositivo",
      View: FormDispositivo,
      onAccept: (data) => {
        addDispositivo(data);
        closeDialog();
      },
      onClose: closeDialog,
    });
  };

  const formEditDispositivo = (row) => {
    setDialogGeneral({
      open: true,
      title: "Editar dispositivo",
      propsView: { row },
      View: FormDispositivo,
      onAccept: (data) => {
        setDispositivo({ ...data, id_movil: row.id_movil });
        closeDialog();
      },
      onClose: closeDialog,
    });
  };

  const formDelDispositivo = (row) => {
    setDialogGeneral({
      open: true,
      title: "Eliminar dispositivo",
      onAccept: () => {
        delDispositivo(row.id_movil);
        closeDialog();
      },
      onClose: closeDialog,
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
      <DialogGeneral {...dialogGeneral} />
    </div>
  );
}

export default Dispositivo;
