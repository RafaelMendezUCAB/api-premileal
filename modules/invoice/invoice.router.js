const express = require("express");
const router = express.Router();
const invoiceController = require("./invoice.controller");
const auth = require("../../middlewares/auth");

module.exports = router;
