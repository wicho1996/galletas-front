import { useRoutes } from 'react-router-dom';

// routes
// import MainRoutes from './MainRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';
// import config from 'config';
import { useContext, useEffect, useState } from 'react';
import axiosSystem from "../utils/axiosSystem";

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    // const context = useContext(LoginContext);
    const [rutas, setRutas] = useState([]);

    const routes = {
        getPages: axiosSystem("Login/getUsuarios")
    };

    const getRutas = () => {
        routes.getPages(
            (res) => {
            setRutas(res);
            console.log(res);
            },
            { dat: "Hola" }
        );
    };

    useEffect(() => {
        getRutas();
    }, [])
    // return useRoutes([rutas], config.basename);
}
