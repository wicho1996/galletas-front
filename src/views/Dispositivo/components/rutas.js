import { useContext } from 'react';
import { contextGeneral } from '../../../utils/contextGeneralProvider';

const GetRutas = () => {
    const context = useContext(contextGeneral);
    return {
        getDispositivos: context.servidor("Dispositivo/getDispositivos"),
        getDispositivo: context.servidor("Dispositivo/getDispositivo"),
        addDispositivo: context.servidorRespuesta("Dispositivo/addDispositivo"),
        setDispositivo: context.servidorRespuesta("Dispositivo/setDispositivo"),
        delDispositivo: context.servidorRespuesta("Dispositivo/delDispositivo")
    }
}

export default GetRutas;