const express = require("express");
const router = express.Router();
const statusController = require("./status.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ statusController.getAllStatus);
router.get("/:id", /*auth.validateToken ,*/ statusController.getStatus);
router.post("/create", /*auth.validateToken ,*/ statusController.postStatus);
router.put("/update/:id", /*auth.validateToken ,*/ statusController.putStatus);
router.delete("/delete/:id", /*auth.validateToken ,*/ statusController.deleteStatus);

module.exports = router;
