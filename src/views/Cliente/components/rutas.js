import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        getClientes: axiosSystem("Cliente/getClientes")
    }
}

export default getRutas;