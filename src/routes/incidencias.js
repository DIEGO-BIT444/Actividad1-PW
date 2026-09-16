const express = require('express'); //importar express
const router = express.Router(); //mini servidor
const { 
    ListarIncidencias, BuscarIncidenciaID, RegistrarIncidencia, ActualizarEstadoIncidencia 
} = require('../controllers/incidenciasController'); //mandar a llamar las funciones desde el controller
//funciones
router.get( '/', ListarIncidencias );
router.get( "/:id", BuscarIncidenciaID );
router.post( '/', RegistrarIncidencia );
router.put("/:id/estado", ActualizarEstadoIncidencia);
//permite que App.js pueda usar las rutas dentro de este archivo
module.exports = router;

