import React from "react";
import {
  Grid,
  TextField,
  Button,
  DialogActions,
  DialogContent,
  Autocomplete 
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";

import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
  return {
    getClienteTipos: axiosSystem("Cliente/getClienteTipos"),
  }
}

export default function FormCliente(props) {
  const rutas = getRutas();
  const { accept, close, row } = props;
  const { register, handleSubmit, control } = useForm();

  const [clienteTipos, setClienteTipos] = React.useState([]);

  const onSubmit = accept;

  const getClienteTipos = () => {
    return rutas.getClienteTipos((res) => {
      setClienteTipos(res.clienteTipos);
    }, { dat: "Hola" });
  }

  React.useEffect(() => {
    getClienteTipos();
  }, []);

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
            <Controller
              // defaultValue={defaultValue}
              name={"clienteTipo"}
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Autocomplete
                  disablePortal
                  fullWidth
                  id="combo-box-demo"
                  onChange={(event, selected) => onChange(selected)}
                  options={clienteTipos}
                  getOptionLabel={(option) => option.nombre}
                  renderInput={(params) => <TextField {...params} label="Tipo cliente" />}
                />
              )}
              
            />
            {/* <TextField
              required
              label="Tipo cliente"
              defaultValue={row?.id_tipo_cliente}
              variant="standard"
              {...register("id_tipo_cliente")}
            /> */}
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
