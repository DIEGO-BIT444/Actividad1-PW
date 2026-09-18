// configuracion de las rutas de los diferentes tipos de endpoints para
//  manipular la informacion de las incidencias con la ayuda del controller
const express = require('express');
const router = express.Router();
const controller = require('../controllers/incidenciasControllers');

//definicion de endpoints para las incidencias
router.post('/incidencias', controller.registrarIncidencia);
router.get('/incidencias', controller.listarIncidencias);
router.get('/estadisticas', controller.obtenerEstadisticas);
//router.get('/incidencias/nombre/:nombre', controller.buscarPorNombre);
router.get('/incidencias/:id', controller.buscarPorId);
router.get('/incidencias/:id/clasificacion', controller.obtenerClasificacion);
router.put('/incidencias/:id/estado', controller.cambiarEstado);
router.delete('/incidencias/:id', controller.eliminarIncidencia);

module.exports = router; // le da los permisos a app.js