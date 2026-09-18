// se encarga de decidir que hacer cuando se reciben las solicitudes de las rutas de incidencias(cuando las rutas son llamadas)
// importo las funciones de validación y limpieza de texto desde el archivo helpers.js
const { textoValido, limpiarTexto } = require('../utils/helpers');
const incidencias = []; // arreglo para almacenar las incidencias

const registrarIncidencia = (req, res) => {
    const { empleado, area, descripcion, prioridad } = req.body;
    if (
    !textoValido(empleado) || 
    !textoValido(area) || 
    !textoValido(descripcion) || 
    !textoValido(prioridad)) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios y no pueden estar vacios' });
    }
    const prioridadLimpia = limpiarTexto(prioridad);
    let prioridadValida = "";
    // se utiliza un switch para validar la prioridad y asignar el formato correcto
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
    res.status(201).json({ message: 'Incidencia registrada correctamente' }); //el estado 201 indica que hubo exito
    // los otros archivos pueden acceder a las funciones flecha del controller

}
//listar todas las incidencias
const listarIncidencias = (req, res) => { //recibe la solicitud y la res como parametros
    res.json(incidencias);
}
//busca por nombre
//const buscarPorNombre = (req, res) => {
  //  const NombreBuscado = limpiarTexto(req.params.nombre);
    //const incidencia = incidencias.find(i => i.empleado === NombreBuscado);
    //if (!incidencia) {
      //  return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    //}
    //res.json(incidencia);

//}

//buscar por id
const buscarPorId = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const incidencia = incidencias.find(i => i.id === idBuscado);
    if (!incidencia) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }
    res.json(incidencia);

}

//cambiar estado
const cambiarEstado = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const estadoNuevo = req.body.estado;
   
    const incidencia = incidencias.find(i => i.id === idBuscado);//buscar la incidencia con find en el array con el id
    if (!incidencia) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    } if (!estadoNuevo) {                                       //retorno de errores
        return res.status(400).json({ mensaje: 'Estado no válido' });
    }
    switch (estadoNuevo) { //validacion de los estados posibles
        case "Pendiente":
        case "En proceso":
        case "Resuelta":
        case "Cancelada":
            incidencia.estado=estadoNuevo;
            return res.json({ mensaje: 'Estado actualizado correctamente', incidencia });
        default:
            return res.status(400).json({ 
                mensaje: 'Estado no válido' });
    }

}
//eliminar incidencia
const eliminarIncidencia = (req, res) => {
    const idBuscado = parseInt(req.params.id);
    const index = incidencias.findIndex(i => i.id === idBuscado); //ubicar la posicion en el array con findIndex
    if (index === -1) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }
    incidencias.splice(index, 1); //eliminar el elemento en esa posicion(splice elimina el elemento en la posicion index y el 1 indica que se elimina un solo elemento)
    res.json({ mensaje: 'Incidencia eliminada correctamente' });
}

//estadisticas generales
const obtenerEstadisticas = (req, res) => {

    const estadisticas = incidencias.reduce(
        (acc, inc) => {
            acc.totalIncidencias++;
            const est = limpiarTexto(inc.estado);
            if (est === "pendiente") acc.pendientes++;
            else if (est === "en proceso") acc.enProceso++;
            else if (est === "resuelta") acc.resueltas++;
            else if (est === "cancelada") acc.canceladas++;
            return acc;
        },
        { totalIncidencias: 0, pendientes: 0, enProceso: 0, resueltas: 0, canceladas: 0 }
    );

    return res.status(200).json(estadisticas);
};

//clasificacion automatica segun prioridad
const obtenerClasificacion = (req, res) => {
    const idBuscado = parseInt(req.params.id); //sacar id de la incidencia usando los pams de la ruta conviertiendolo a entero
    const incidencia = incidencias.find(i => i.id === idBuscado);
    if (!incidencia) {
        return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }
    // clasificacion de la incidencia segun la prioridad
    let clasificacion = "";
    switch (incidencia.prioridad.trim().toLowerCase()) {
        case "alta":
            clasificacion = "Crítica";
            break;
        case "media":
            clasificacion = "Importante";
            break;
        case "baja":
            clasificacion = "Normal";
            break;
    }
    res.json({ id: incidencia.id, clasificacion });
}



module.exports = {
        registrarIncidencia,
        listarIncidencias,
        //buscarPorNombre,
        buscarPorId,
        cambiarEstado,
        eliminarIncidencia,
        obtenerEstadisticas,
        obtenerClasificacion
    }

    