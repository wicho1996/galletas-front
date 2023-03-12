import React from "react";
import {
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";

import { useFormContext } from "react-hook-form";

import axiosSystem from "../../../utils/axiosSystem";
import ControlledAutocomplete from "../../../ui-component/ControlledComponents/ControlledAutocomplete";

const getRutas = () => {
  return {
    getClienteTipos: axiosSystem("Cliente/getClienteTipos"),
  };
};

export default function FormCliente(props) {
  const rutas = getRutas();
  const { row } = props;
  const { register, control } = useFormContext();

  const [clienteTipos, setClienteTipos] = React.useState([]);

  const getClienteTipos = () => {
    return rutas.getClienteTipos(
      (res) => {
        setClienteTipos(res.clienteTipos);
      },
      { dat: "Hola" }
    );
  };

  React.useEffect(() => {
    getClienteTipos();
  }, []);

  return (
    clienteTipos.length > 0 && <div>
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
        <ControlledAutocomplete
          control={control}
          name="clienteTipo"
          options={clienteTipos}
          getOptionLabel={(option) => option.nombre}
          isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
          renderInput={(params) => <TextField {...params} variant="standard" label="Tipo cliente" />}
          defaultValue={clienteTipos?.find((tipo) => tipo.id_tipo_cliente == row?.id_tipo_cliente)}
        />
        </Grid>
        <Grid item xs={4}>
          <TextField
            type="number"
            label="Latitud"
            defaultValue={row?.lat}
            variant="standard"
            {...register("lat")}
          />
        </Grid>
        <Grid item xs={4}>
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
