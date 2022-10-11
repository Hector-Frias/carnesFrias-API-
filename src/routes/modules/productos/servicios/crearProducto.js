const Joi = require("joi");
const sql = require('mssql');
const config = require('../../../../conecctionDB/conex');


/**
 * ?descripcion de los datos del producto
 */
const schema = Joi.object({
  Id_categoria: Joi.number().integer().required(),
  Nombre: Joi.string().required(),
  Precio: Joi.number().required(),
});

/**
 * ?funcion para crear un producto
 */
async function newProducto(req, res) {
  try {
    let conex = await sql.connect(config);
    let idProd = await conex.request().input("Nombre", sql.VarChar, req.body.Nombre).input("Id_categoria", sql.Int, req.body.Id_categoria)
      .query(`select Id from Producto where Nombre=@Nombre and Id_categoria=@Id_categoria`);

    if (idProd.recordset.length > 0) {

      return res.json({
        message: "Ya existe este producto "
      })
    }
    else {
      let producto = await conex
        .request()
        .input("Id_categoria", sql.Int, req.body.Id_categoria)
        .input("Nombre", sql.NVarChar, req.body.Nombre)
        .input("Precio", sql.Float, req.body.Precio)
        .execute("pr_newProducto");
      console.log(producto);
      return res.json("Producto cargado con exito")
    }

  } catch (error) {
    return res.json("Algo paso:" + error);
  }
};
//hola
module.exports = {
  schema,
  newProducto
};
