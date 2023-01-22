import * as React from "react";

import {
  Box,
  Card,
  Stack,
  TextField,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";

import { Mapa, Marker } from "../../ui-component/Mapa";
import Routes from "../../routes";
import getRutas from "./components/rutas";

function Login() {
  const rutas = getRutas();

  const { register, handleSubmit } = useForm();

  const [usuarioValidado, setUsuarioValidado] = React.useState(-1);

  const onSubmit = (data) => {
    rutas.validarSesion((res) => {
      if (res.estatus) {
        sessionStorage.setItem("token", res.token);
        setUsuarioValidado(res.estatus);
      }
    }, data);
  };

  const checkToken = () => {
    const token = sessionStorage.getItem("token");
    rutas.validarToken((res) => {
      setUsuarioValidado(res.estatus);
    }, { token });
  };

  React.useEffect(() => {
    checkToken();
  },[]);

  const login = () => {
    return (
      <Box sx={{ mt: 15, display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card sx={{ width: 500 }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography gutterBottom variant="h5" component="div">
                  Inicia sesión para continuar
                </Typography>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Usuario"
                  variant="standard"
                  {...register("usuario")}
                />
                <TextField
                  fullWidth
                  id="standard-basic"
                  type="password"
                  label="Contraseña"
                  variant="standard"
                  {...register("contraseña")}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Button size="small" type="submit">
                Iniciar sesión
              </Button>
            </CardActions>
          </Card>
        </form>
      </Box>
    );
  };

  const cargarRutas = () => {
    return <Routes />;
  };
  console.log(usuarioValidado);
  if (usuarioValidado == 1) {
    return cargarRutas();
  } else if(usuarioValidado == 0){
    return login();
  }
  return <></>;
  

}

export default Login;
