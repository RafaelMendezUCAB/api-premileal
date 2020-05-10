const express = require("express");
const router = express.Router();
const offerController = require("./offer.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ offerController.getAllOffers);
router.get("/:id", /*auth.validateToken ,*/ offerController.getOffer);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ offerController.postOffer);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ offerController.putOffer);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ offerController.deleteOffer);

module.exports = router;