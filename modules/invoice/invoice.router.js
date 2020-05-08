const express = require("express");
const router = express.Router();
const invoiceController = require("./invoice.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ invoiceController.getAllInvoices);
router.get("/:id", /*auth.validateToken ,*/ invoiceController.getInvoice);
router.post("/create", /*auth.validateToken ,*/ invoiceController.postInvoice);
router.put("/update/:id", /*auth.validateToken ,*/ invoiceController.putInvoice);
router.delete("/delete/:id", /*auth.validateToken ,*/ invoiceController.deleteInvoice);

module.exports = router;