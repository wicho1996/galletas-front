import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';
import { useContext, useEffect, useState } from 'react';
// import LoginContext from 'Context/ContextLogin';
// import axios from './utils/axios';
import axiosSystem from "./utils/axiosSystem";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    // const context = useContext(LoginContext);
    const [rutas, setRutas] = useState([]);
    useEffect(() => {
        // if (context.login?.token && !context.login?.usuario) {
            // context.bloqueo(true);
            // axios.defaults.headers.common = { authorization: context.login?.token };
            axiosSystem("Login/getPaginas")
                // .get('/usuario/TraerRutas')
                // .then((response) => {
                //     // context.bloqueo(false);
                //     if (response.status == 200) {
                //         setRutas(MainRoutes(response.data.rutas, response.data.info));
                //         // context.cambioLogin({
                //         //     ...context.login,
                //         //     usuario: response.data.info
                //         // });
                //     }
                // })
                // .catch((error) => {
                //     console.error(`error ${error}`);
                //     // context.cerrarLogin();
                // });
        // } 
        // else 
        // if (!context.login?.token) setRutas(AuthenticationRoutes);
    }, []);
    return useRoutes([rutas], config.basename);
}
