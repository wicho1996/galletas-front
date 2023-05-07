import * as React from "react";

import Tabla from "../../ui-component/TablaWicho";
import DialogGeneral, { dialogGeneralPropsDef } from "../../ui-component/mods/DialogGeneral";

function Cliente() {
  const [clientes, setClientes] = React.useState([]);
  const [dialogGeneral, setDialogGeneral] = React.useState(dialogGeneralPropsDef);

  return (
    <div>
      <DialogGeneral {...dialogGeneral}>{dialogGeneral.component}</DialogGeneral>
    </div>
  );
}

export default Cliente;
