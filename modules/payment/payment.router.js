const express = require("express");
const router = express.Router();
const paymentController = require("./payment.controller");
const auth = require("../../middlewares/auth");
const multer = require("multer");
const fileUpload = multer({ storage: multer.memoryStorage({}) });

/* --------------------------- GET ------------------------- */
router.get("/all", paymentController.getAllPayments);
router.get("/:id", paymentController.getPayment);
router.get("/user/all/:id", paymentController.getUserPayments);
router.get("/pending/all", paymentController.getPendingPayments);

/* ------------------------- POST -------------------------- */
router.post("/create", paymentController.createPayment);
router.post("/points/purchase", paymentController.pointsPurchase);
router.post("/notify/administrator", paymentController.notifyAdministrator);
router.post("/test/payment", fileUpload.single("file") ,paymentController.testPay);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", paymentController.updatePayment);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", paymentController.deletePayment);

module.exports = router;
