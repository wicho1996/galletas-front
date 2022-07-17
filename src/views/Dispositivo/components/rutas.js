import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        getDispositivos: axiosSystem("Dispositivo/getDispositivos")
    }
}

export default getRutas;