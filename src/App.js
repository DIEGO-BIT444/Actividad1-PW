const express = require('express')//importar la libreria
const app = express() //levantar el server
app.use(express.json()) // para que lea el formato json
const port = 8000
// importar las rutas
const incidenciasRoutes = require('./routes/incidencias')
app.use('/incidencias', incidenciasRoutes)

// levantar el servidor
app.listen(port, () => {
    console.log(`Server is running on http:localhost:${port}`)
})