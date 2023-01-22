export const SET_MESSAGE = 'SET_MESSAGE'

export function setMessage(estatus, mensaje) {
    return { type: SET_MESSAGE, estatus, mensaje };
}