require("dotenv").config();
/**
 * ?conexion a sql server, se usa variable de entorno
 */

const conexProp = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    encrypt: false,
    trustServerCertificate: true
  },
};






module.exports = conexProp;
