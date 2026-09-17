// se encarga de decidir que hacer cuando se reciben las solicitudes de las rutas de incidencias(cuando las rutas son llamadas)
// importo las funciones de validación y limpieza de texto desde el archivo helpers.js
const { textoValido, limpiarTexto } = require('../utils/helpers');
const incidencias = []; // arreglo para almacenar las incidencias

const registrarIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;
    if (!textoValido(empleado) || !textoValido(area) || !textoValido(descripcion) || !textoValido(prioridad)) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y no pueden estar vacios' });
    }
    const prioridadLimpia = limpiarTexto(prioridad);
    let prioridadValida = "";
    // se utiliza un switch para validar la prioridad y asignar un valor válido
    switch (prioridadLimpia) {
        case "baja":
            prioridadValida = "Baja";
            break;
        case "media":
            prioridadValida = "Media";
            break;
        case "alta":
            prioridadValida = "Alta";
            break;
        default:
            return res.status(400).json({ error: 'Prioridad no válida, debe ser: baja, media o alta' });
    }
    // ya validados los datos, se crea un objeto incidencia y se agrega al arreglo incidencias
    const incidencia = {
        id: incidencias.length + 1,
        empleado: limpiarTexto(empleado),
        area: limpiarTexto(area),
        descripcion: limpiarTexto(descripcion),
        prioridad: prioridadValida,
        estado: "Pendiente"
    };
    incidencias.push(incidencia);
    res.status(201).json({ message: 'Incidencia registrada correctamente' });
    // los otros archivos pueden acceder a las funciones flecha del controller

}
//listar todas las incidencias
const listarIncidencias = (req, res) => { //recibe la solicitud y la res como parametros
    res.json(incidencias);
}
//buscar por id
const buscarPorId = (req, res) => {
    const idBuscado = parseInt(req.params.id); //obtener el id de la incidencia desde los parametros de la ruta y convertirlo a numero entero
    const incidencia = incidencias.find(i => i.id === idBuscado); //usar find para buscar la incidencia en el array
    if (!incidencia) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }
    res.json(incidencia);

}
//cambiar estado
const cambiarEstado = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const estadoNuevo = req.body.estado;
    const validarEstado =(estado) => {
        return estado === "Pendiente" || estado === "En proceso" || estado === "Resuelta" || estado === "Cancelada";
    }
    const incidencia = incidencias.find(i => i.id === idBuscado);//buscar la incidencia con find en el array con el id
    if (!incidencia) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    } if (!validarEstado(estadoNuevo)) {                                       //retorno de errores
        return res.status(400).json({ mensaje: 'Estado no válido' });
    }
    incidencia.estado = estadoNuevo;
    res.json({mensaje: 'Estado actualizado correctamente', incidencia});
     //actualizacion de estado en caso de que exista y el estado sea valido
}
module.exports = {
        registrarIncidencia,
        listarIncidencias,
        buscarPorId,
        cambiarEstado
    }

    