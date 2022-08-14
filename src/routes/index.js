import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';

import { useEffect, useState } from 'react';

// ==============================|| ROUTING RENDER ||============================== //

const paginas = [
    { idRuta: 1,  nombre: 'Mapa', codigo: 'mapa', ruta: 'mapa', icono: 'Map', tipo: 1, orden: 1 },
    { idRuta: 2,  nombre: 'Clientes', codigo: 'clie', ruta: 'clientes', icono: 'Group', tipo: 2, orden: 7 },
    { idRuta: 3,  nombre: 'Productos', codigo: 'prod', ruta: 'productos', icono: 'Cookie', tipo: 2, orden: 7 },
    { idRuta: 4,  nombre: 'Dispositivos', codigo: 'disp', ruta: 'dispositivos', icono: 'PhoneAndroid', tipo: 2, orden: 7 },
    { idRuta: 5,  nombre: 'Empleados', codigo: 'empl', ruta: 'empleados', icono: 'Engineering', tipo: 2, orden: 5 },
    { idRuta: 6,  nombre: 'Configuración', codigo: 'conf', ruta: 'configuracion', icono: 'Settings', tipo: 2, orden: 6 },
    
    
]

export default function ThemeRoutes() {
    const [rutas, setRutas] = useState([]);
    const mainRutas = MainRoutes(paginas);

    useEffect(() => {
        setRutas(mainRutas);
    }, [])

    return useRoutes([rutas]);
}
