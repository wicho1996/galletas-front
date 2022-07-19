import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        getProductos: axiosSystem("Producto/getProductos")
    }
}

export default getRutas;