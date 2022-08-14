import React from "react";
import {
  Grid,
  TextField,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";

import { useForm } from "react-hook-form";

export default function FormDispositivo(props) {
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
              label="imei"
              defaultValue={row?.imei}
              variant="standard"
              {...register("imei")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Celular"
              defaultValue={row?.celular}
              variant="standard"
              {...register("celular")}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Descripcion"
              defaultValue={row?.descripcion}
              variant="standard"
              {...register("descripcion")}
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
