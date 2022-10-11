const usuarios = require("./modules/usuarios");
const pedidos = require('./modules/pedidos')
const productos = require("./modules/productos");

//exporto una funcion para usuarios y producto
module.exports = (definirRuta) => {
  usuarios(definirRuta);
  pedidos(definirRuta);
  productos(definirRuta);
};
