const express = require("express");
const router = express.Router();
const bankAccountController = require("./bankAccount.controller");
const auth = require("../../middlewares/auth");

module.exports = router;
