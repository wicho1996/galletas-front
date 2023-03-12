import React from "react";
import { Grid, TextField } from "@mui/material";

import { useFormContext } from "react-hook-form";

export default function FormEmpleado(props) {
  const { row } = props;
  const { register } = useFormContext();

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={4}>
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
            label="Apellido 1"
            defaultValue={row?.apellido_paterno}
            variant="standard"
            {...register("apellido_paterno")}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Apellido 2"
            defaultValue={row?.apellido_materno}
            variant="standard"
            {...register("apellido_materno")}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            label="Id Movil"
            defaultValue={row?.id_movil}
            variant="standard"
            {...register("id_movil")}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Telefono"
            defaultValue={row?.telefono}
            variant="standard"
            {...register("telefono")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Usuario"
            defaultValue={row?.usuario}
            variant="standard"
            {...register("usuario")}
          />
        </Grid>
      </Grid>
    </div>
  );
}
