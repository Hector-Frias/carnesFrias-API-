const express = require("express");
const router = express.Router();
const validacionToken = require('../../../middleware/auth')
//const middlewarJoi = require('../../../middleware/schema')




module.exports = (definirRuta) => {
	router.get("/verPedidos", (req, res, next) => { validacionToken(req, res, next, 'basico') }, require("./servicios/verPedidos"));
	// router.post("/crearProducto",crearProducto.validacionToken,(req, res, next) => {
	// middlewarJoi(req, res, next, crearProducto.schema);},crearProducto.registrar);
	definirRuta("/pedidos", router);
};
