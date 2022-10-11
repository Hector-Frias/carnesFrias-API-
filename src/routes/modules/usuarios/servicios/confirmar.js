var jwt = require("jsonwebtoken");
const config = require('../../../../conecctionDB/conex');
const bcrypt = require("bcrypt");
const sql = require("mssql");
/**
 * ?es para confirmar el token que se  envia al email
 * ?y cargar los datos del nuevo usuario en la base de datos
 * */
async function confirmar(req, res) {
  const token = req.params.token;
  let pool = await sql.connect(config);
  console.log("conexion a sqlserver perfecto")
  try {
    var decoded = jwt.verify(token, process.env.PASS_JWT);
    let usuario = await pool.request()
      .input('Email', sql.VarChar, decoded.Email)
      .query(`select Email from Usuarios where Email=@Email`);
    if (usuario.recordset.length > 0) {
      console.log("ya existe un usuario con este email");
      return res.json({
        message: "ya existe un usuario con este email,ingrese otro email"
      });
    }
    decoded.Pass = bcrypt.hashSync(decoded.Pass, 12);
    // decoded.create = new Date();
    delete decoded.iat;
    let newUsuario = await pool
      .request()
      .input("Email", sql.VarChar, decoded.Email)
      .input("Pass", sql.NVarChar, decoded.Pass)
      .input("Nombre", sql.VarChar, decoded.Nombre)
      .input("Apellido", sql.VarChar, decoded.Apellido)
      .input("Edad", sql.Int, decoded.Edad)
      .execute("pr_newUsuario");

    console.log(newUsuario.recordset);
    return res.send("usuario confirmado");

  } catch (err) {
    return res.send("Token no válido");
  }
}

module.exports = confirmar;