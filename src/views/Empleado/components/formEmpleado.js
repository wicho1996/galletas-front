import React from "react";
import { Grid, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

export default function FormEmpleado() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            required
            id="outlined-required"
            label="Nombre"
            defaultValue="Nombre"
            variant="standard"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="outlined-required"
            label="Apellido 1"
            defaultValue="Apellido 1"
            variant="standard"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="outlined-required"
            label="Apellido 2"
            defaultValue="Apellido 2"
            variant="standard"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="outlined-required"
            label="Correo"
            defaultValue="Correo"
            variant="standard"
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            required
            id="outlined-required"
            label="Contraseña"
            defaultValue="Contraseña"
            variant="standard"
          />
        </Grid>
        <Grid item xs={4}>
          <input type="submit" />
        </Grid>
      </Grid>
    </form>
  );
}
