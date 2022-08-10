import React from "react";
import {
  Grid,
  TextField,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";

import { useForm } from "react-hook-form";

export default function FormCliente(props) {
  const { accept, close, row } = props;
  const { register, handleSubmit } = useForm();

  const onSubmit = accept;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Nombre"
              defaultValue={row?.tienda}
              variant="standard"
              {...register("tienda")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Tipo cliente"
              defaultValue={row?.id_tipo_cliente}
              variant="standard"
              {...register("id_tipo_cliente")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Latitud"
              defaultValue={row?.lat}
              variant="standard"
              {...register("lat")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Longitud"
              defaultValue={row?.lon}
              variant="standard"
              {...register("lon")}
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
