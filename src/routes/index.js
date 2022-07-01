import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';

import { useEffect, useState } from 'react';

// ==============================|| ROUTING RENDER ||============================== //

const paginas = [
    { idRuta: 1,  nombre: 'Ver Dispositivos', codigo: 'disp', ruta: 'dispositivo', icono: 'MailIcon', tipo: 1, orden: 1 },
    { idRuta: 2,  nombre: 'Ver Dispositivos', codigo: 'disp', ruta: 'dispositivo', icono: 'MailIcon', tipo: 1, orden: 2 },
    { idRuta: 3,  nombre: 'Ver Dispositivos', codigo: 'disp', ruta: 'dispositivo', icono: 'MailIcon', tipo: 1, orden: 3 },
    { idRuta: 4,  nombre: 'Ver Dispositivos', codigo: 'disp', ruta: 'dispositivo', icono: 'MailIcon', tipo: 1, orden: 4 },
    { idRuta: 5,  nombre: 'Empleados', codigo: 'empl', ruta: 'empleados', icono: 'MailIcon', tipo: 1, orden: 5 },
    { idRuta: 6,  nombre: 'Configuración', codigo: 'conf', ruta: 'configuracion', icono: 'MailIcon', tipo: 2, orden: 6 }
]

export default function ThemeRoutes() {
    const [rutas, setRutas] = useState([]);
    const mainRutas = MainRoutes(paginas);

    useEffect(() => {
        setRutas(mainRutas);
    }, [])

    return useRoutes([rutas]);
}
