const express = require("express");
const router = express.Router();
const crearProducto = require("./servicios/crearProducto");
const middlewarJoi = require('../../../middleware/schema');
const validacionToken = require('../../../middleware/auth');




module.exports = (definirRuta) => {
  router.get("/verProducto", require('./servicios/verProducto'));
  router.post("/crearProducto", (req, res, next) => { validacionToken(req, res, next, 'basico') }, (req, res, next) => { middlewarJoi(req, res, next, crearProducto.schema); },
    crearProducto.newProducto
  );
  definirRuta("/products", router);
};
