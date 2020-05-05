const express = require("express");
const router = express.Router();
const withdrawController = require("./withdraw.controller");
const auth = require("../../middlewares/auth");

module.exports = router;
