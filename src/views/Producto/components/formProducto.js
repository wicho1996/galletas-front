import React from "react";
import {
  Grid,
  TextField,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";

import { useForm } from "react-hook-form";

export default function FormProducto(props) {
  const { accept, close, row } = props;
  const { register, handleSubmit } = useForm();

  const onSubmit = accept;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers>
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
              label="Costo"
              defaultValue={row?.costo}
              variant="standard"
              {...register("costo")}
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
