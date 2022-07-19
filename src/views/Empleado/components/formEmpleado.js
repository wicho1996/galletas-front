import React from "react";
import {
  Grid,
  TextField,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";

import { useForm } from "react-hook-form";

export default function FormEmpleado(props) {
  const { accept, close, row } = props;
  const { register, handleSubmit } = useForm();

  const onSubmit = accept;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
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
              {...register("apellido1")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Apellido 2"
              defaultValue={row?.apellido_materno}
              variant="standard"
              {...register("apellido2")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Correo"
              defaultValue={row?.usuario}
              variant="standard"
              {...register("correo")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              type="password"
              label="Contraseña"
              defaultValue={row?.contraseña}
              variant="standard"
              {...register("password")}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancelar</Button>
        <Button type="submit">Aceptar</Button>
      </DialogActions>
    </form>
  );
}
