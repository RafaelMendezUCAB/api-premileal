const express = require("express");
const router = express.Router();
const offerController = require("./offer.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ offerController.getAllOffers);
router.get("/:id", /*auth.validateToken ,*/ offerController.getOffer);
router.post("/create", /*auth.validateToken ,*/ offerController.postOffer);
router.put("/update/:id", /*auth.validateToken ,*/ offerController.putOffer);
router.delete("/delete/:id", /*auth.validateToken ,*/ offerController.deleteOffer);

module.exports = router;