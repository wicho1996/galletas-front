import { useContext } from "react";
import { contextGeneral } from "../../../utils/contextGeneralProvider";

const GetRutas = () => {
    const context = useContext(contextGeneral);
    return {
        getProductos: context.servidor("Producto/getProductos"),
        getProducto: context.servidor("Producto/getProducto"),
        addProducto: context.servidorRespuesta("Producto/addProducto"),
        setProducto: context.servidorRespuesta("Producto/setProducto"),
        delProducto: context.servidorRespuesta("Producto/delProducto")

    }
}

export default GetRutas;