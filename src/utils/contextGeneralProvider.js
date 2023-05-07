import React, { createContext, useState } from 'react';
import { Alert, Snackbar, Backdrop } from '@mui/material';
import axios from './axios';

import logo from '../assets/logo-test.gif';

export const contextGeneral = createContext();

const mensajeDefProps = { open: false, estatus: 0, value: '' };

const ContextGeneralProvider = ({children}) => {

    const [mensaje, setMensaje] = useState(mensajeDefProps);
    const cerrarMensaje = () => setMensaje(mensajeDefProps);

    const [cargando, setCargando] = useState(false);
    const cerrarCaragando = () => setCargando(false);

    const servidor = (ruta) => (fn, data) => {
        setCargando(true);
        axios
          .post(ruta, data)
          .then(function (res) {
            // handle success
            fn(res.data);
            setCargando(false);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            setCargando(false);
          });
    }

    const servidorRespuesta = (ruta) => (fn, data) => {
        setCargando(true);
        axios
          .post(ruta, data)
          .then(function (res) {
            // handle success
            fn(res.data);
            setMensaje({open: true, estatus: res.data.estatus, value: res.data.mensaje});
            setCargando(false);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            setCargando(false);
          });
    }

    return (
        <contextGeneral.Provider value={{setMensaje, setCargando, servidor, servidorRespuesta}}>
            <Snackbar open={mensaje.open} autoHideDuration={10000} onClose={cerrarMensaje}>
                <Alert variant="filled" onClose={cerrarMensaje} severity={mensaje.estatus == -1 ? "error" : mensaje.estatus == 1 ? "success" : "info"} sx={{ width: '100%' }}>
                    {mensaje.value}
                </Alert>
            </Snackbar>
            <Backdrop sx={{ color: '#fff', zIndex: 1000000 }} open={cargando} onClick={cerrarCaragando} >
                {/* <CircularProgress color="inherit" /> */}
                <img src={logo}></img>
            </Backdrop>
            {children}
        </contextGeneral.Provider>
    )
}

export default ContextGeneralProvider;