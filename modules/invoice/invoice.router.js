const express = require("express");
const router = express.Router();
const invoiceController = require("./invoice.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ invoiceController.getAllInvoices);
router.get("/:id", /*auth.validateToken ,*/ invoiceController.getInvoice);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ invoiceController.createInvoice);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ invoiceController.updateInvoice);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ invoiceController.deleteInvoice);

module.exports = router;