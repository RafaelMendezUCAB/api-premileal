const express = require("express");
const router = express.Router();
const statusController = require("./status.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ statusController.getAllStatus);
router.get("/:id", /*auth.validateToken ,*/ statusController.getStatus);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ statusController.createStatus);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ statusController.updateStatus);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ statusController.deleteStatus);

module.exports = router;
