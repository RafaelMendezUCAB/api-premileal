const express = require("express");
const router = express.Router();
const paymentController = require("./payment.controller");
const auth = require("../../middlewares/auth");

module.exports = router;
