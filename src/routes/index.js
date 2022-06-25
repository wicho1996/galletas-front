import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
// import AuthenticationRoutes from './AuthenticationRoutes';
// import config from 'config';
import { useContext, useEffect, useState } from 'react';
import axiosSystem from "../utils/axiosSystem";
import Layout from "../layout/Layout";

// ==============================|| ROUTING RENDER ||============================== //

const paginas = [
    { idRuta: 1, codigo: 'disp', nombre: 'Ver Dispositivos', icono: 'MailIcon', tipo: 1 },
    { idRuta: 2, codigo: 'disp', nombre: 'Ver Dispositivos', icono: 'MailIcon', tipo: 1 },
    { idRuta: 3, codigo: 'disp', nombre: 'Ver Dispositivos', icono: 'MailIcon', tipo: 1 },
    { idRuta: 4, codigo: 'disp', nombre: 'Ver Dispositivos', icono: 'MailIcon', tipo: 1 },
    { idRuta: 5, codigo: 'conf', nombre: 'Configuración', icono: 'MailIcon', tipo: 2 }
]

export default function ThemeRoutes() {
    // const context = useContext(LoginContext);
    const [rutas, setRutas] = useState([]);

    // const routes = {
    //     getPages: axiosSystem("Login/getUsuarios")
    // };

    // const getRutas = () => {
    //     routes.getPages(
    //         (res) => {
    //             setRutas(res);
    //         },
    //         { dat: "Hola" }
    //     );
    // };

    // useEffect(() => {
    //     getRutas();
    // }, []);

    // return (
    //     <div>
    //       <Layout rutas={rutas} />
    //     </div>
    // );
    const mainRutas = MainRoutes(paginas);
    useEffect(() => {
        setRutas(mainRutas);
    }, [])
    return useRoutes([rutas]);
}
