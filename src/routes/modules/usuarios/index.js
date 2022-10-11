const express = require("express");
const router = express.Router();
const registrar = require("./servicios/registrar");
const login = require("./servicios/logearme");
const middlewarJoi = require('../../../middleware/schema')



module.exports = (definirRuta) => {
  router.post("/signup", (req, res, next) => { middlewarJoi(req, res, next, registrar.schema); }, registrar.fun);
  router.post("/login", (req, res, next) => { middlewarJoi(req, res, next, login.schema); }, login.logine);
  router.get("/confirm/:token", require("./servicios/confirmar"));
  definirRuta("/users", router);
};
