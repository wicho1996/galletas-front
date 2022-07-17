import * as React from "react";
import { Grid } from "@mui/material";
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

  const formAddProducto = (selected) => (event) => {
    setDialog({
      open: true,
      title: "Agregar producto",
      component: (
        <FormProducto
          accept={(data) => console.log(data)}
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
          accept={(data) => console.log(data)}
          close={() => setDialog({})}
        />
      ),
    });
  };

  // Config
  const acciones = [
    { label: "Nuevo producto", icon: <PersonAdd />, click: formAddProducto },
  ];
  const accionesFila = [{ label: "Editar", click: formEditProducto, enabled: true, }];

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
