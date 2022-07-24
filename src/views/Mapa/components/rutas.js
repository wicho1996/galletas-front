import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        getUbicacionesDispositivos: axiosSystem("Mapa/getUbicacionesDispositivos")
    }
}

export default getRutas;