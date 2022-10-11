const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../../../conecctionDB/conex");
const sql = require("mssql")
/**
 * !ojo tener en cuenta que las decripcion de los datos de email y pass deben ser las
 * !misma que el esquema de registrar.
 */
const schema = Joi.object({
  Email: Joi.string().email().required(),
  Pass: Joi.string().min(6).max(15).required(),
});

/**
 * ?Esta funcion verifica si al momento de logearme mi email y pass son correcto, me genera un token con mis datos
 * ?para ser utilizado en otros servicios
 * !ojo al momento de generan un token, eliminar los datos sencibles ej la pass
 */

function unResultadoEn5Seg() {
  let elResultado = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('OK')
    }, 5000);
  });
  return elResultado;
}

async function login(req, res) {

  try {
    let conex = await sql.connect(config);
    console.log("Perfecto")
    let usuario = await conex.request().input('Email', sql.VarChar, req.body.Email).query(`select * from Usuarios where Email= @Email`)
    usuario = usuario.recordset.length > 0 ? usuario.recordset[0] : null;
    if (usuario != null) {
      let PassObteni = (usuario.Pass);
      let resultado = await bcrypt.compare(req.body.Pass, PassObteni);
      if (resultado) {
        delete usuario.Pass;
        var token = await jwt.sign(usuario, process.env.PASS_JWT);
        console.log(usuario);
        return res.json({
          mensaje: "el login fue exitoso",
          token,
        });
      } else {
        return res.send("La contraseña no es correcta");
      }
    } else {
      return res.send("El usuario no existe, registrate por favor");
    }
  } catch (error) {
    console.log(error)
  }

}

module.exports = {
  logine: login,
  schema: schema,
};