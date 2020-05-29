const express = require("express");
const router = express.Router();
const paymentController = require("./payment.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ paymentController.getAllPayments);
router.get("/:id", /*auth.validateToken ,*/ paymentController.getPayment);
router.get("/user/all/:id", paymentController.getUserPayments);
router.get("/pending/all", paymentController.getPendingPayments);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ paymentController.createPayment);
router.post("/points/purchase", /*auth.validateToken ,*/ paymentController.pointsPurchase)

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ paymentController.updatePayment);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ paymentController.deletePayment);

module.exports = router;
