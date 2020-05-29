const express = require("express");
const router = express.Router();
const placeController = require("./place.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", placeController.getAllPlaces);
router.get("/:id", placeController.getPlace);

/* ------------------------- POST -------------------------- */
router.post("/create", placeController.createPlace);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", placeController.updatePlace);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", placeController.deletePlace);

module.exports = router;
