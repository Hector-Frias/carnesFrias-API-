const config = require("../../../../conecctionDB/conex");
const sql = require("mssql");

/**
 * ?funcion para ver el pedidio del usuario logeado
 * todo(se utilizo Stored Procedures)
 */
async function verPedidos(req, res) {
  try {
    let pool = await sql.connect(config);
    console.log("conexion a sqlserver perfecto")

    let IdLogeado = (req.verificationToken.Id)
    console.log(IdLogeado)
    let pedidos = await pool.request().input('Id', sql.Int, IdLogeado).execute('pr_verPedidos')
    delete pedidos.recordsets;
    delete pedidos.output;
    delete pedidos.rowsAffected;
    delete pedidos.iat; pedidos
    delete pedidos.returnValue;
    for (let i = 0; i < pedidos.recordset.length; i++) {
      console.table({
        tuspedidos: pedidos.recordset[i],
      })
    }

    return res.send(pedidos)
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
}

module.exports = verPedidos;


