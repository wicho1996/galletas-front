import { useContext } from "react";
import { contextGeneral } from "../../../utils/contextGeneralProvider";

const Services = () => {
    const context = useContext(contextGeneral);
    return {
        getClientes: context.servidor("Cliente/getClientes")
    }
}

export default Services;