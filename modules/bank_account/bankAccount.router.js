const express = require("express");
const router = express.Router();
const bankAccountController = require("./bankAccount.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", bankAccountController.getAllBankAccounts);
router.get("/:id", bankAccountController.getBankAccount);
router.get("/all/:idUser", bankAccountController.getAllUserBankAccounts);
router.get("/status/:bankAccountID", bankAccountController.getBankAccountStatus);

/* ------------------------- POST -------------------------- */
router.post("/create", bankAccountController.createBankAccount);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", bankAccountController.updateBankAccount);
router.put("/verify/:id", bankAccountController.verifyBankAccount);
router.put("/set/primary/:accountid/:userid", bankAccountController.setBankAccountPrimary);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", bankAccountController.deleteBankAccount);

module.exports = router;
