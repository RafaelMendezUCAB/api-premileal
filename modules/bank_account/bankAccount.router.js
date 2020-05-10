const express = require("express");
const router = express.Router();
const bankAccountController = require("./bankAccount.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ bankAccountController.getAllBankAccounts);
router.get("/:id", /*auth.validateToken ,*/ bankAccountController.getBankAccount);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ bankAccountController.postBankAccount);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ bankAccountController.putBankAccount);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ bankAccountController.deleteBankAccount);

module.exports = router;
