import * as React from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
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
    setDialog({
      open: true,
      title: "Agregar cliente",
      component: (
        <FormCliente
          accept={(data) => {
            console.log(data);
            // addCliente(data);
            // setDialog({});
          }}
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
          accept={(data) => {
            setCliente({ ...data, id_cliente: row.id_cliente });
            setDialog({});
          }}
          close={() => setDialog({})}
        />
      ),
    });
  };

  const formDelCliente = (row) => {
    setDialog({
      open: true,
      title: "Eliminar cliente",
      component: (
        <div>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Eliminar cliente !!!
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog({})}>Cancelar</Button>
            <Button onClick={() => {
              delCliente(row.id_cliente);
              setDialog({});
            }}>Aceptar</Button>
          </DialogActions>
        </div>
      ),
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
            // activeSelect={true}
          />
        </Grid>
      </Grid>
      <DialogMod {...dialog}>{dialog.component}</DialogMod>
    </div>
  );
}

export default Cliente;
