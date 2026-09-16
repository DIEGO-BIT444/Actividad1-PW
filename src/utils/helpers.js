// funciones para validar los datos de entrada de las incidencias
const textoValido = (texto) => {
  return typeof texto === 'string' && texto.trim().length > 0;
}
const limpiarTexto = (texto) => {
  return texto.trim();
}
// los otros archivos de rutas y controladores pueden usar estas funciones para validar y limpiar los datos de entrada antes de procesarlos
module.exports = {
  textoValido,
  limpiarTexto
};