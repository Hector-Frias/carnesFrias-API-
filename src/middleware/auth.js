const jwt = require("jsonwebtoken");
/**
 * ?funcion para validar si el usuario se logeo y pueda realizar peticiones
 */

async function validacionToken(req, res, next, rol) {
  if (req.headers.authorization) {
    try {
      let token = req.headers.authorization;
      token = token.replace("Bearer ", "");
      try {
        let verificationToken = jwt.verify(token, process.env.PASS_JWT);

        if (verificationToken.Rol == rol || verificationToken.Rol == 'administrador') {
          req.verificationToken = verificationToken
          console.log(verificationToken)
          next();
        } else {
          return res.status(401).json({
            error: "No posee el rol " + rol
          })
        }
      } catch (error) {
        res.status(401).json({
          mensaje: "la verificacion salio mal",
        });
      }
    } catch (error) {
      console.log(error),
        res.status(401).json({
          mensaje: "el token ya no es valido",
        });
    }
  } else {
    res.status(401).json({
      mensaje: "El token no existe",
    });
  }
}






module.exports = validacionToken;




