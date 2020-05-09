const express = require("express");
const router = express.Router();
const userOfferController = require("./userOffer.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ userOfferController.getAllUserOffers);
router.get("/:id", /*auth.validateToken ,*/ userOfferController.getUserOffer);
router.post("/create", /*auth.validateToken ,*/ userOfferController.postUserOffer);
router.put("/update/:id", /*auth.validateToken ,*/ userOfferController.putUserOffer);
router.delete("/delete/:id", /*auth.validateToken ,*/ userOfferController.deleteUserOffer);

module.exports = router;
