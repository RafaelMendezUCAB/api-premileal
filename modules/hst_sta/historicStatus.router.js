const express = require("express");
const router = express.Router();
const historicStatusController = require("./historicStatus.controller");
const auth = require("../../middlewares/auth");

module.exports = router;
