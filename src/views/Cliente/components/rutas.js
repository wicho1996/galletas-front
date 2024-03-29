import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        getClientes: axiosSystem("Cliente/getClientes"),
        getCliente: axiosSystem("Cliente/getCliente"),
        addCliente: axiosSystem("Cliente/addCliente"),
        setCliente: axiosSystem("Cliente/setCliente"),
        delCliente: axiosSystem("Cliente/delCliente")
    }
}

export default getRutas;