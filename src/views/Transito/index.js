import * as React from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import Tabla from "../../ui-component/TablaWicho";
import headers from "./components/headers";
import getRutas from "./components/rutas";

function Transito() {
  const rutas = getRutas();
  const [transitos, setTransitos] = React.useState([]);
  React.useEffect(() => {
    getTransitos();
  }, []);
  const acciones = [
  //  { label: "Nuevo producto", icon: <PersonAdd />, click: formAddProducto },
  ];
  const accionesFila = [
   // { label: "Editar", click: formEditProducto, enabled: true },
    //{ label: "Eliminar", click: formDelProducto, enabled: true },
  ]
  const getTransitos = () => {
    return rutas.getTransitos(
      (res) => {
        setTransitos(res);
      },
      { dat: "Hola" }
    );
  };
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Tabla
            tableName="Transitos"
            rowId="id_transito"
            rows={transitos}
            columns={headers.producto}
            acciones={acciones}
            accionesFila={accionesFila}
            // activeSelect={true}
          />
        </Grid>
      </Grid>
      
    </div>
  );
}

export default Transito;
