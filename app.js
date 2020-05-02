require("dotenv").config();
const express = require("express");
const app = express();
const compression = require("compression");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const cors = require("cors");
const logger = require("./logger");
const connectionBD = require("./config/db");
const router = require("./router");

//Se habilita el cors para interaccion con otras aplicaciones
app.use(cors());

//Configuracion de elementos de seguridad y optimizacion
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Coneccion a la BD incluida en el req de cada consulta
app.use((req, res, next) => {
  req.con = connectionBD;
  next();
});

//Logger de peticiones a la API
app.use((req, res, next) => {
  logger.info(req.method + " " + req.originalUrl);
  next();
});

//Router general de la API o prefijo global
app.use("/premileal/api", router);

// Manejo general de errores 404
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;
