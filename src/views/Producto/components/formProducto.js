import React from "react";
import {
  Grid,
  TextField,
} from "@mui/material";

import { useFormContext } from "react-hook-form";

export default function FormProducto(props) {
  const { row } = props;
  const { register } = useFormContext();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            label="Nombre"
            defaultValue={row?.nombre}
            variant="standard"
            {...register("nombre")}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            type="number"
            label="Costo"
            defaultValue={row?.costo}
            variant="standard"
            {...register("costo")}
          />
        </Grid>
      </Grid>
    </div>
  );
}
