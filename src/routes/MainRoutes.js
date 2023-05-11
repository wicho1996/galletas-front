import { Fragment, lazy } from 'react';
import { Navigate } from 'react-router';

// // project imports
// import MainLayout from 'layout/MainLayout';

// New Inports
import Layout from "../layout/Layout";
import Mapa from "../views/Mapa";
import Cliente from "../views/Cliente";
import Producto from "../views/Producto";
import Dispositivo from "../views/Dispositivo";
import Empleado from "../views/Empleado";
import Login from "../views/Login";
import Transito from "../views/Transito";

// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //
const elements = {
    mapa: () => <Mapa />,
    clie: () => <Cliente />,
    prod: () => <Producto />,
    disp: () => <Dispositivo />,
    empl: () => <Empleado />,
    trans: () => <Transito />,
};

const MainRoutes = (rutas, usuario) => ({
    path: '/',
    element: <Layout rutas={rutas} />,
    children: [
        {
            path: '/login',
            element: <Login />
        },
        {
            path: '/perfil',
            element: <Fragment>Hola :D</Fragment>
        },
        ...rutas.map((pagina) => {
            const Componente = elements[pagina.codigo] || (() => <Fragment>Falta agregar ruta...</Fragment>);

            return {
                path: `/${pagina.ruta}`,
                element: <Componente />
            };
        }),
        { path: '*', element: <Navigate to="/" /> }
    ]
});

export default MainRoutes;
