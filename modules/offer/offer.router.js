const express = require("express");
const router = express.Router();
const offerController = require("./offer.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", offerController.getAllOffers);
router.get("/:id", offerController.getOffer);

/* ------------------------- POST -------------------------- */
router.post("/create", offerController.createOffer);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", offerController.updateOffer);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", offerController.deleteOffer);

module.exports = router;