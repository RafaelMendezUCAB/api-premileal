const express = require("express");
const router = express.Router();
const historicStatusController = require("./historicStatus.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", historicStatusController.getAllHistoricStatus);
router.get("/:id", historicStatusController.getHistoricStatus);

/* ------------------------- POST -------------------------- */
router.post("/create", historicStatusController.createHistoricStatus);
router.post("/userStatus/:idUser", historicStatusController.createUserStatus);
router.post("/bankAccountStatus/:idBankAccount", historicStatusController.createBankAccountStatus);
router.post("/payment", historicStatusController.createPaymentStatus);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", historicStatusController.updateHistoricStatus);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", historicStatusController.deleteHistoricStatus);

module.exports = router;
