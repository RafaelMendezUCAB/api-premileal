const express = require("express");
const router = express.Router();
const bankController = require("./bank.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ bankController.getAllBanks);

/* ------------------------- POST -------------------------- */

/* -------------------------- PUT ---------------------------- */

/* ------------------------- DELETE -------------------------- */

module.exports = router;