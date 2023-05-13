import { useContext } from "react";
import { contextGeneral } from "../../../utils/contextGeneralProvider";

const GetRutas = () => {
    const context = useContext(contextGeneral);
    return {
        getClientes: context.servidor("Cliente/getClientes"),
        getCliente: context.servidor("Cliente/getCliente"),
        addCliente: context.servidorRespuesta("Cliente/addCliente"),
        setCliente: context.servidorRespuesta("Cliente/setCliente"),
        delCliente: context.servidorRespuesta("Cliente/delCliente"),
        getClienteTipos: context.servidor("Cliente/getClienteTipos")
    }
}

export default GetRutas;