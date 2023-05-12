import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        getTransitos: axiosSystem("Transito/getTransitos"),

    }
}

export default getRutas;