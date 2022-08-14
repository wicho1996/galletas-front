import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        getEmpleados: axiosSystem("Empleado/getEmpleados"),
        getEmpleado: axiosSystem("Empleado/getEmpleado"),
        addEmpleado: axiosSystem("Empleado/addEmpleado"),
        setEmpleado: axiosSystem("Empleado/setEmpleado"),
        delEmpleado: axiosSystem("Empleado/delEmpleado")
    }
}

export default getRutas;