const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const routes = require("./src/routes");
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/web", express.static("src/public"));

routes((path, func) => {
  app.use(path, func);
});

app.listen(9000);
