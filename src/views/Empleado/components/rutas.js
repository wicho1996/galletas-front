import { useContext } from "react";
import { contextGeneral } from "../../../utils/contextGeneralProvider";

const GetRutas = () => {
    const context = useContext(contextGeneral);
    return {
        getEmpleados: context.servidor("Empleado/getEmpleados"),
        getEmpleado: context.servidor("Empleado/getEmpleado"),
        addEmpleado: context.servidorRespuesta("Empleado/addEmpleado"),
        setEmpleado: context.servidorRespuesta("Empleado/setEmpleado"),
        delEmpleado: context.servidorRespuesta("Empleado/delEmpleado"),
        getDispDisponibles: context.servidor("Dispositivo/getDispositivos"),
    }
}

export default GetRutas;