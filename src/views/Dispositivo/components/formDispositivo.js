import React from "react";
import {
  Grid,
  TextField,
} from "@mui/material";

import { useFormContext } from "react-hook-form";

export default function FormDispositivo(props) {
  const { row } = props;
  const { register } = useFormContext();

  return (
    <div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              label="imei"
              defaultValue={row?.imei}
              variant="standard"
              {...register("imei")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              type="tel"
              label="Celular"
              defaultValue={row?.celular}
              variant="standard"
              {...register("celular")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descripcion"
              multiline
              rows={2}
              defaultValue={row?.descripcion}
              variant="standard"
              {...register("descripcion")}
            />
          </Grid>
        </Grid>
    </div>
  );
}
