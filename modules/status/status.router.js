const express = require("express");
const router = express.Router();
const statusController = require("./status.controller");
const auth = require("../../middlewares/auth");

module.exports = router;
