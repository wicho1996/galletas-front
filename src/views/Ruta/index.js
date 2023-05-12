import * as React from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import Tabla from "../../ui-component/TablaWicho";
import DialogGeneral, { dialogGeneralPropsDef } from "../../ui-component/mods/DialogGeneral";

function Ruta() {
//   const rutas = GetRutas();
  const [clientes, setClientes] = React.useState([]);

  const [dialogGeneral, setDialogGeneral] = React.useState(dialogGeneralPropsDef);
  const closeDialog = () => setDialogGeneral(dialogGeneralPropsDef);

  React.useEffect(() => {
    // getClientes();
  }, []);

//   const getClientes = () => {
//     return rutas.getClientes((res) => {
//         setClientes(res.clientes);
//       }, { dat: "Hola" }
//     );
//   };

//   const addCliente = (cliente) => {
//     return rutas.addCliente((res) => {
//       setClientes(res.clientes);
//     }, cliente);
//   };

//   const setCliente = (cliente) => {
//     return rutas.setCliente((res) => {
//       setClientes(res.clientes);
//     }, cliente);
//   };

//   const delCliente = (id_cliente) => {
//     return rutas.delCliente((res) => {
//       setClientes(res.clientes);
//     }, { id_cliente });
//   };

  const formAddRuta = (row) => (event) => {
    setDialogGeneral({
      open: true,
      title: "Agregar ruta",
    //   View: FormCliente, 
      onAccept: (data) => {
        // addCliente({ ...data });
        closeDialog();
      },
      onClose: closeDialog
    });
  };

//   const formEditCliente = (row) => {
//     setDialogGeneral({
//       open: true,
//       title: "Editar cliente",
//       propsView: { row },
//       View: FormCliente,
//       onAccept: (data) => {
//         setCliente({ ...data, id_cliente: row.id_cliente });
//         closeDialog();
//       },
//       onClose: closeDialog
//     });
//   };

//   const formDelCliente = (row) => {
//     setDialogGeneral({
//       open: true,
//       title: "Eliminar cliente",
//       onAccept: () => {
//         delCliente(row.id_cliente);
//         closeDialog();
//       },
//       onClose: closeDialog
//     });
//   };

  // Config
  const acciones = [
    { label: "Nueva ruta", icon: <Add />, click: formAddRuta },
  ];
  const accionesFila = [
    // { label: "Editar", click: formEditCliente, enabled: true },
    // { label: "Eliminar", click: formDelCliente, enabled: true },
  ];

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabla
            tableName="Rutas"
            rowId="idRuta"
            rows={[]}
            columns={[]}
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

export default Ruta;
