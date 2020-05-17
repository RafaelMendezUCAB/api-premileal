const express = require("express");
const router = express.Router();
const bankAccountController = require("./bankAccount.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ bankAccountController.getAllBankAccounts);
router.get("/:id", /*auth.validateToken ,*/ bankAccountController.getBankAccount);
router.get("/userBank/all/:idUser", /*auth.validateToken ,*/ bankAccountController.getAllUserBankAccounts);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ bankAccountController.createBankAccount);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ bankAccountController.updateBankAccount);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ bankAccountController.deleteBankAccount);

module.exports = router;
