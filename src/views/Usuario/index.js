import * as React from "react";

import Tabla from "../../ui-component/TablaWicho";
import DialogGeneral, { dialogGeneralPropsDef } from "../../ui-component/mods/DialogGeneral";

function Usuarios() {
  const [clientes, setClientes] = React.useState([]);

  const [dialogGeneral, setDialogGeneral] = React.useState(dialogGeneralPropsDef);
  const closeDialog = () => setDialogGeneral(dialogGeneralPropsDef);

  return (
    <div>
      <DialogGeneral {...dialogGeneral} />
    </div>
  );
}

export default Usuarios;
