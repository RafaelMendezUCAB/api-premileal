const express = require("express");
const router = express.Router();
const withdrawController = require("./withdraw.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ withdrawController.getAllWithdraws);
router.get("/:id", /*auth.validateToken ,*/ withdrawController.getWithdraw);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ withdrawController.postWithdraw);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ withdrawController.putWithdraw);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ withdrawController.deleteWithdraw);

module.exports = router;
