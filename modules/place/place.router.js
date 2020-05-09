const express = require("express");
const router = express.Router();
const placeController = require("./place.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ placeController.getAllPlaces);
router.get("/:id", /*auth.validateToken ,*/ placeController.getPlace);
router.post("/create", /*auth.validateToken ,*/ placeController.postPlace);
router.put("/update/:id", /*auth.validateToken ,*/ placeController.putPlace);
router.delete("/delete/:id", /*auth.validateToken ,*/ placeController.deletePlace);

module.exports = router;
