import React, { useState, useEffect } from "react";
import { Grid, TextField } from "@mui/material";

import { useFormContext } from "react-hook-form";

import ControlledAutocomplete from "../../../ui-component/ControlledComponents/ControlledAutocomplete";
import getRutas from "./rutas";

export default function FormEmpleado(props) {
  const { row } = props;
  const { register, control } = useFormContext();
  const servicios = getRutas();

  const [ dispositivos, setDispositivos ] = useState([]);

  const getDispDisponibles = () => {
      servicios.getDispDisponibles((dispositivos) => {
        setDispositivos(dispositivos);
      }, { estatus: 1 })
  }

  useEffect(() => {
    getDispDisponibles();
  }, []);

  if (dispositivos.length == 0) {
    return <></>;
  }

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
        <Grid item xs={8}>
          <ControlledAutocomplete
            control={control}
            name="dispositivo"
            options={dispositivos}
            getOptionLabel={(option) => option.imei}
            isOptionEqualToValue={(option, value) => option.imei === value.imei}
            renderInput={(params) => <TextField {...params} variant="standard" label="Dispositivos disponibles" />}
            defaultValue={dispositivos?.find((movil) => movil.id_movil === row?.id_movil)}
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
