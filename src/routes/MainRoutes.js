import { lazy } from 'react';
import { Navigate } from 'react-router';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import SamplePage from 'views/sample-page';
import Puestos from 'views/catalogo/Seguridad/Puestos';
import { PersonalAdmin, PersonalOper, PersonalVent } from 'views/IntroduccionInicial';
import { PersonalAdminEsp, PersonalVentEsp } from 'views/IntroduccionEspecifica';
import { Trainer } from 'views/Trainer';
import Roles from 'views/catalogo/Seguridad/Roles';
import Usuario from 'views/catalogo/Usuario';
import Cursos from 'views/catalogo/Cursos';
import Grupos from 'views/catalogo/Grupo';
import Proveedor from 'views/catalogo/Proveedor';
import Encuesta from 'views/catalogo/Encuesta';
import Pagina from 'views/catalogo/Pagina';
import { ColaboradorDash } from 'views/Dash';
import HomeInicio from 'views/HomeParticipantes';
import PerfilUsuario from 'views/PerfilUsuario';
import Calificaciones from 'views/Calificaciones';
import { PanelAlumno } from 'views/Configuracion/PanelAlumno';
import { Seguimiento } from 'views/Reportes';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// ==============================|| MAIN ROUTING ||============================== //
const elements = {
    ctlPst: Puestos,
    intIniAdm: PersonalAdmin,
    intIniOpe: PersonalOper,
    intIniVen: PersonalVent,
    intEspAdm: PersonalAdminEsp,
    intEspVen: PersonalVentEsp,
    tra: Trainer,
    ctlRl: Roles,
    ctlUsu: Usuario,
    ctlCrs: Cursos,
    ctlGrp: Grupos,
    ctlPro: Proveedor,
    ctlEnc: Encuesta,
    ctlPag: Pagina,
    dasCol: ColaboradorDash,
    homeIni: HomeInicio,
    clfClb: Calificaciones,
    configPan: PanelAlumno,
    repSeg: Seguimiento
};

const MainRoutes = (rutas, usuario) => ({
    path: '/',
    element: <MainLayout rutas={rutas} usuario={usuario} />,
    children: [
        // {
        //     path: '/',
        //     element: usuario.isCrm ? (
        //         <HomeInicio usuario={usuario} permisos={{ cambiarContrasena: !usuario.idcontrato }} />
        //     ) : (
        //         <Trainer usuario={usuario} permisos={{ cambiarContrasena: !usuario.idcontrato }} />
        //     )
        // },
        {
            path: '/perfil',
            element: <PerfilUsuario usuario={usuario} permisos={{ cambiarContrasena: !usuario.idcontrato }} />
        },
        ...rutas.map((vst) => {
            const Componente = elements[vst.idpagina] || DashboardDefault;
            return {
                path: vst.raiz === '0' ? (vst.rutaPadre ? vst.rutaPadre : '') + vst.ruta : '/',
                element: <Componente permisos={vst.permisos} usuario={usuario} />
            };
        }),
        { path: '*', element: <Navigate to="/" /> }
    ]
});

export default MainRoutes;
