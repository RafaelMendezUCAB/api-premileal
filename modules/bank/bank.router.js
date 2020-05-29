const express = require("express");
const router = express.Router();
const bankController = require("./bank.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", bankController.getAllBanks);
router.get("/routing/numbers/:bank", bankController.getRoutingNumbers)

/* ------------------------- POST -------------------------- */

/* -------------------------- PUT ---------------------------- */

/* ------------------------- DELETE -------------------------- */

module.exports = router;