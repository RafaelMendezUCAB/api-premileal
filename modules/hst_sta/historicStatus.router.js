const express = require("express");
const router = express.Router();
const historicStatusController = require("./historicStatus.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ historicStatusController.getAllHistoricStatus);
router.get("/:id", /*auth.validateToken ,*/ historicStatusController.getHistoricStatus);
router.post("/create", /*auth.validateToken ,*/ historicStatusController.postHistoricStatus);
router.put("/update/:id", /*auth.validateToken ,*/ historicStatusController.putHistoricStatus);
router.delete("/delete/:id", /*auth.validateToken ,*/ historicStatusController.deleteHistoricStatus);

module.exports = router;
