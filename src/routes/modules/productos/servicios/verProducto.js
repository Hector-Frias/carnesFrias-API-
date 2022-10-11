const config = require("../../../../conecctionDB/conex");
const sql = require("mssql");

/**
 * ?funcion para ver el pedidio del usuario logeado
 * todo(se utilizo Stored Procedures)
 */
async function verProducto(req, res) {
  try {
    let conex = await sql.connect(config);
    console.log("conexion a sqlserver perfecto")
    let producto = await conex.request().execute(`pr_verProductos`)
    console.log(producto.recordset);
    return res.json(producto.recordset);
  }

  catch (error) {
    return res.send(error)
  }
}


module.exports = verProducto;


