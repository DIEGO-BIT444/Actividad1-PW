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
    module.exports = {
        registrarIncidencia
    }
}