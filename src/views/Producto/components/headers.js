const columns = {
    producto: [
        { label: '#', name: 'id_producto', filtrar: true },
        { label: 'Nombre', name: 'nombre', filtrar: true },
        { label: 'Costo', name: { type: 'Money', name: 'costo' }, filtrar: true }
    ]
};

export default columns;