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

// We initialize Cors.
app.use(cors());

// Security and Optimization dependencies initialization.
app.use(compression());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection for each request.
app.use((req, res, next) => {
  req.con = connectionBD;
  next();
});

// Requests logger to API.
app.use((req, res, next) => {
  logger.info(req.method + " " + req.originalUrl);
  next();
});

// Base route (prefix) for all routes.
app.use("/premileal/api", router);

// 404 Error: Not Found.
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;
