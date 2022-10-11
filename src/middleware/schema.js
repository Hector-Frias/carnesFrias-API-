/**
 * ?este funcion  sirve para manejo de errores y validacion de datos
 */
const middlewarJoi = (req, res, next, schema) => {
  try {
    const value = schema.validate(req.body);
    if (value.error) {
      console.log(value.error.message);
      res.send(value.error.message);
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.send(err.toString());
  }
};

module.exports = middlewarJoi;