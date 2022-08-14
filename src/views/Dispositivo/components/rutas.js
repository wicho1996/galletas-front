import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        getDispositivos: axiosSystem("Dispositivo/getDispositivos"),
        getDispositivo: axiosSystem("Dispositivo/getDispositivo"),
        addDispositivo: axiosSystem("Dispositivo/addDispositivo"),
        setDispositivo: axiosSystem("Dispositivo/setDispositivo"),
        delDispositivo: axiosSystem("Dispositivo/delDispositivo")
    }
}

export default getRutas;