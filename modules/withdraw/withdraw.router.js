const express = require("express");
const router = express.Router();
const withdrawController = require("./withdraw.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ withdrawController.getAllWithdraws);
router.get("/:id", /*auth.validateToken ,*/ withdrawController.getWithdraw);
router.post("/create", /*auth.validateToken ,*/ withdrawController.postWithdraw);
router.put("/update/:id", /*auth.validateToken ,*/ withdrawController.putWithdraw);
router.delete("/delete/:id", /*auth.validateToken ,*/ withdrawController.deleteWithdraw);

module.exports = router;
