const express = require("express");
const router = express.Router();
const paymentController = require("./payment.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ paymentController.getAllPayments);
router.get("/:id", /*auth.validateToken ,*/ paymentController.getPayment);
router.post("/create", /*auth.validateToken ,*/ paymentController.postPayment);
router.put("/update/:id", /*auth.validateToken ,*/ paymentController.putPayment);
router.delete("/delete/:id", /*auth.validateToken ,*/ paymentController.deletePayment);

module.exports = router;
