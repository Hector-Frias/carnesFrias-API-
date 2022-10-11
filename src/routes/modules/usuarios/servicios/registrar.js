const Joi = require("joi");
const nodemailer = require("nodemailer");
var jwt = require("jsonwebtoken");

/**
 * ?descripcion de datos con sus propiedades */
const schema = Joi.object({
  Email: Joi.string().email().required(),
  Pass: Joi.string().min(6).max(15).required(),
  Nombre: Joi.string().min(2).max(15).required(),
  Apellido: Joi.string().min(2).max(15).required(),
  Edad: Joi.number().integer().min(18).max(100).required(),
});

const sendEmail = async (body, token) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: body.Email, // list of receivers
    subject:
      "Registro de talweb" +
      (body.nombre ? " de " + body.nombre : " de anonimus"), // Subject line
    text: "Confirma el registro: http://localhost:9000/users/confirm/" + token, // plain text body
    //html: "<b>Hello world?</b>", // html body
  });
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};

/**
 * ?funcion para generar un token de los datos ingresados y enviarlo al email
 * ?del que se quiera registrar. para que confirme. y no ingresar email no validos*/
const registrar = (req, res) => {
  console.log(req.body);
  var token = jwt.sign(req.body, process.env.PASS_JWT);
  sendEmail(req.body, token);
  res.send("Debe confirmar el email");
};

module.exports = {
  schema: schema,
  fun: registrar,
};
