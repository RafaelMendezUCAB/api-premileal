const express = require("express");
const router = express.Router();
const userOfferController = require("./userOffer.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", userOfferController.getAllUserOffers);
router.get("/:id", userOfferController.getUserOffer);

/* ------------------------- POST -------------------------- */
router.post("/create", userOfferController.createUserOffer);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", userOfferController.updateUserOffer);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", userOfferController.deleteUserOffer);

module.exports = router;
