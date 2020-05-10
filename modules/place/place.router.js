const express = require("express");
const router = express.Router();
const placeController = require("./place.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ placeController.getAllPlaces);
router.get("/:id", /*auth.validateToken ,*/ placeController.getPlace);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ placeController.createPlace);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ placeController.updatePlace);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ placeController.deletePlace);

module.exports = router;
