import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        getEmpleados: axiosSystem("Login/getEmpleados")
    }
}

export default getRutas;