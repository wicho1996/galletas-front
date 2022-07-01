import * as React from "react";
import {
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    IconButton,
    Avatar,
    Grid,
    Collapse
} from "@mui/material";
import { Delete, Folder } from "@mui/icons-material";

import Tabla from "../../ui-component/Tabla";
import headers from "./components/headers";
import getRutas from "./components/rutas";


function Empleado() {
    const rutas = getRutas();
    const [empleados, setEmpleados] = React.useState([]);

    const getEmpleados = () => {
        rutas.getEmpleados(
            (res) => {
                setEmpleados(res);
                console.log(res);
            },
            { dat: "Hola" }
        );
    };

    React.useEffect(() => {
        getEmpleados();
    }, []);

    // Config
    const acciones = [{ label: 'Nuevo usuario', icon: <Folder />, click: () => () => {} }];
    const accionesFila = [
        { label: 'Ascender a Trainer', onClick: () => {}, enabled: true }
    ];

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item>
                </Grid>
            </Grid>
        </div>
    );
}


export default Empleado;
