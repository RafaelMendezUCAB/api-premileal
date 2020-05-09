const express = require("express");
const router = express.Router();
const levelController = require("./level.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ levelController.getAllLevels);
router.get("/:id", /*auth.validateToken ,*/ levelController.getLevel);
router.post("/create", /*auth.validateToken ,*/ levelController.postLevel);
router.put("/update/:id", /*auth.validateToken ,*/ levelController.putLevel);
router.delete("/delete/:id", /*auth.validateToken ,*/ levelController.deleteLevel);

module.exports = router;
