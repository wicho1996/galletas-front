import axiosSystem from "../../../utils/axiosSystem";

const getRutas = () => {
    return {
        getProductos: axiosSystem("Producto/getProductos"),
        getProducto: axiosSystem("Producto/getProducto"),
        addProducto: axiosSystem("Producto/addProducto"),
        setProducto: axiosSystem("Producto/setProducto"),
        delProducto: axiosSystem("Producto/delProducto")

    }
}

export default getRutas;