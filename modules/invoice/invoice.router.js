const express = require("express");
const router = express.Router();
const invoiceController = require("./invoice.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", invoiceController.getAllInvoices);
router.get("/:id", invoiceController.getInvoice);

/* ------------------------- POST -------------------------- */
router.post("/create", invoiceController.createInvoice);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", invoiceController.updateInvoice);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", invoiceController.deleteInvoice);

module.exports = router;