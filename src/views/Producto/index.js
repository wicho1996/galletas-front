import * as React from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import DialogMod from "../../ui-component/mods/Dialog";
import headers from "./components/headers";
import getRutas from "./components/rutas";

import FormProducto from "./components/formProducto";

function Producto() {
  const rutas = getRutas();
  const [productos, setProductos] = React.useState([]);
  const [dialog, setDialog] = React.useState({});

  React.useEffect(() => {
    getProductos();
  }, []);

  const getProductos = () => {
    return rutas.getProductos(
      (res) => {
        setProductos(res);
      },
      { dat: "Hola" }
    );
  };

  const addProducto = (producto) => {
    return rutas.addProducto((res) => {
      setProductos(res.productos);
    }, producto);
  };

  const setProducto = (producto) => {
    return rutas.setProducto((res) => {
      setProductos(res.productos);
    }, producto);
  };

  const delProducto = (id_producto) => {
    return rutas.delProducto((res) => {
      setProductos(res.productos);
    }, { id_producto });
  };

  const formAddProducto = (selected) => (event) => {
    setDialog({
      open: true,
      title: "Agregar producto",
      component: (
        <FormProducto
          accept={(data) => {
            addProducto(data);
            setDialog({});
          }}
          close={() => setDialog({})}
        />
      ),
    });
  };

  const formEditProducto = (row) => {
    setDialog({
      open: true,
      title: "Editar producto",
      component: (
        <FormProducto
          row={row}
          accept={(data) => {
            setProducto({ ...data, id_producto: row.id_producto });
            setDialog({});
          }}
          close={() => setDialog({})}
        />
      ),
    });
  };

  const formDelProducto = (row) => {
    setDialog({
      open: true,
      title: "Eliminar producto",
      component: (
        <div>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                Eliminar producto !!!
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog({})}>Cancelar</Button>
            <Button onClick={() => {
              delProducto(row.id_producto);
              setDialog({});
            }}>Aceptar</Button>
          </DialogActions>
        </div>
      ),
    });
  };

  // Config
  const acciones = [
    { label: "Nuevo producto", icon: <PersonAdd />, click: formAddProducto },
  ];
  const accionesFila = [
    { label: "Editar", click: formEditProducto, enabled: true },
    { label: "Eliminar", click: formDelProducto, enabled: true },
  ];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla
            tableName="Productos"
            rowId="id_producto"
            rows={productos}
            columns={headers.producto}
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

export default Producto;
