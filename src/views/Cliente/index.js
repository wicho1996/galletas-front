import * as React from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import DialogGeneral, { dialogGeneralPropsDef } from "../../ui-component/mods/DialogGeneral";
import headers from "./components/headers";
import GetRutas from "./components/rutas";

import FormCliente from "./components/formCliente";

function Cliente() {
  const rutas = GetRutas();
  const [clientes, setClientes] = React.useState([]);

  const [dialogGeneral, setDialogGeneral] = React.useState(dialogGeneralPropsDef);
  const closeDialog = () => setDialogGeneral(dialogGeneralPropsDef);

  React.useEffect(() => {
    getClientes();
  }, []);

  const getClientes = () => {
    return rutas.getClientes((res) => {
        setClientes(res.clientes);
      }, { dat: "Hola" }
    );
  };

  const addCliente = (cliente) => {
    return rutas.addCliente((res) => {
      setClientes(res.clientes);
    }, cliente);
  };

  const setCliente = (cliente) => {
    return rutas.setCliente((res) => {
      setClientes(res.clientes);
    }, cliente);
  };

  const delCliente = (id_cliente) => {
    return rutas.delCliente((res) => {
      setClientes(res.clientes);
    }, { id_cliente });
  };

  const formAddCliente = (selected) => (event) => {
    setDialogGeneral({
      open: true,
      title: "Agregar cliente",
      stage: FormCliente, 
      accept: (data) => {
        addCliente({ ...data });
        closeDialog();
      },
      close: closeDialog
    });
  };

  const formEditCliente = (row) => {
    setDialogGeneral({
      open: true,
      title: "Editar cliente",
      propsstage: { row },
      stage: FormCliente,
      accept: (data) => {
        setCliente({ ...data, id_cliente: row.id_cliente });
        closeDialog();
      },
      close: closeDialog
    });
  };

  const formDelCliente = (row) => {
    setDialogGeneral({
      open: true,
      title: "Eliminar cliente",
      accept: () => {
        delCliente(row.id_cliente);
        closeDialog();
      },
      close: closeDialog
    });
  };

  // Config
  const acciones = [
    { label: "Nuevo cliente", icon: <PersonAdd />, click: formAddCliente },
  ];
  const accionesFila = [
    { label: "Editar", click: formEditCliente, enabled: true },
    { label: "Eliminar", click: formDelCliente, enabled: true },
  ];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla
            tableName="Clientes"
            rowId="id_cliente"
            rows={clientes}
            columns={headers.cliente}
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

export default Cliente;
