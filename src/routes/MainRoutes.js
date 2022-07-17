import { Fragment, lazy } from 'react';
import { Navigate } from 'react-router';

// // project imports
// import MainLayout from 'layout/MainLayout';

// New Inports
import Layout from "../layout/Layout";
import Cliente from "../views/Cliente";
import Producto from "../views/Producto";
import Dispositivo from "../views/Dispositivo";
import Empleado from "../views/Empleado";

// dashboard routing
// const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //
const elements = {
    clie: () => <Cliente />,
    prod: () => <Producto />,
    disp: () => <Dispositivo />,
    empl: () => <Empleado />,
};

const MainRoutes = (rutas, usuario) => ({
    path: '/',
    element: <Layout rutas={rutas} />,
    children: [
        {
            path: '/perfil',
            element: (() => <Fragment>Hola :D</Fragment>)
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
