import React, { useEffect } from "react";
import {
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";

import { useFormContext } from "react-hook-form";

import Services from "./Services";
import ControlledAutocomplete from "../../../ui-component/ControlledComponents/ControlledAutocomplete";

export default function FormRuta(props) {
  const services = Services();
  const { row } = props;
  const { register, control } = useFormContext();

  const [clientes, setClientes] = React.useState([]);

  useEffect(() => {
    services.getClientes((res) => {
        setClientes(res.clientes);
    }, {})
  }, [])

  if (clientes?.idCliente) {
    return <></>;
  }

  return (
    <div>
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
        <Grid item xs={12}>
        <ControlledAutocomplete
          control={control}
          name="clientesVisitar"
          options={clientes}
          getOptionLabel={(option) => option.tienda}
          isOptionEqualToValue={(option, value) => option.id_cliente === value.id_cliente}
          renderInput={(params) => <TextField {...params} variant="standard" label="Clientes a visitar" />}
          defaultValue={clientes?.find((cliente) => cliente.id_cliente == row?.id_cliente)}
          multiple
          freeSolo
        />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            label="Latitud"
            defaultValue={row?.lat}
            variant="standard"
            {...register("lat")}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            label="Longitud"
            defaultValue={row?.lon}
            variant="standard"
            {...register("lon")}
          />
        </Grid>
      </Grid>
    </div>
  );
}
