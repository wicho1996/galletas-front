import * as React from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import headers from "./components/headers";
import getRutas from "./components/rutas";
import DialogGeneral from "../../ui-component/mods/DialogGeneral";

import FormProducto from "./components/formProducto";

function Producto() {
  const rutas = getRutas();
  const [productos, setProductos] = React.useState([]);
  const [dialogGeneral, setDialogGeneral] = React.useState({});

  React.useEffect(() => {
    getProductos();
  }, []);

  const handleCloseDialog = () => setDialogGeneral({});

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
    setDialogGeneral({
      open: true,
      title: "Agregar producto",
      component: ( <FormProducto /> ),
      accept: (data) => {
        addProducto(data);
        setDialogGeneral({});
      },
      close: handleCloseDialog
    });
  };

  const formEditProducto = (row) => {
    setDialogGeneral({
      open: true,
      title: "Editar producto",
      component: ( <FormProducto row={row} /> ),
      accept: (data) => {
        setProducto({ ...data, id_producto: row.id_producto });
        setDialogGeneral({});
      },
      close: handleCloseDialog
    });
  };

  const formDelProducto = (row) => {
    setDialogGeneral({
      open: true,
      title: "Eliminar producto",
      accept: () => {
        delProducto(row.id_producto);
        setDialogGeneral({});
      },
      close: handleCloseDialog
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
      <DialogGeneral {...dialogGeneral}>{dialogGeneral.component}</DialogGeneral>
    </div>
  );
}

export default Producto;
