const express = require("express");
const router = express.Router();
const historicStatusController = require("./historicStatus.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ historicStatusController.getAllHistoricStatus);
router.get("/:id", /*auth.validateToken ,*/ historicStatusController.getHistoricStatus);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ historicStatusController.createHistoricStatus);
router.post("/userStatus/:idUser", /*auth.validateToken ,*/ historicStatusController.createUserStatus);
router.post("/bankAccountStatus/:idBankAccount", /*auth.validateToken ,*/ historicStatusController.createBankAccountStatus);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ historicStatusController.updateHistoricStatus);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ historicStatusController.deleteHistoricStatus);

module.exports = router;
