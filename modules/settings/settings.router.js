const express = require("express");
const router = express.Router();
const settingsController = require("./settings.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ settingsController.getAllSettings);
router.get("/:id", /*auth.validateToken ,*/ settingsController.getSetting);
router.post("/create", /*auth.validateToken ,*/ settingsController.postSettings);
router.put("/update/:id", /*auth.validateToken ,*/ settingsController.putSettings);
router.delete("/delete/:id", /*auth.validateToken ,*/ settingsController.deleteSettings);

module.exports = router;
