import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        validarSesion: axiosSystem("Login/validarSesion"),
        validarToken: axiosSystem("Login/validarToken")
    }
}

export default getRutas;