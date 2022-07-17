import * as React from "react";
import { Grid } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import DialogMod from "../../ui-component/mods/Dialog";
import headers from "./components/headers";
import getRutas from "./components/rutas";

import FormCliente from "./components/formCliente";

function Cliente() {
  const rutas = getRutas();
  const [clientes, setClientes] = React.useState([]);
  const [dialog, setDialog] = React.useState({});

  React.useEffect(() => {
    getClientes();
  }, []);

  const getClientes = () => {
    return rutas.getClientes(
      (res) => {
        setClientes(res);
      },
      { dat: "Hola" }
    );
  };

  const formAddCliente = (selected) => (event) => {
    setDialog({
      open: true,
      title: "Agregar cliente",
      component: (
        <FormCliente
          accept={(data) => console.log(data)}
          close={() => setDialog({})}
        />
      ),
    });
  };

  const formEditCliente = (row) => {
    setDialog({
      open: true,
      title: "Editar cliente",
      component: (
        <FormCliente
          row={row}
          accept={(data) => console.log(data)}
          close={() => setDialog({})}
        />
      ),
    });
  };

  // Config
  const acciones = [
    { label: "Nuevo cliente", icon: <PersonAdd />, click: formAddCliente },
  ];
  const accionesFila = [{ label: "Editar", click: formEditCliente, enabled: true, }];

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
            // activeSelect={true}
          />
        </Grid>
      </Grid>
      <DialogMod {...dialog}>{dialog.component}</DialogMod>
    </div>
  );
}

export default Cliente;
