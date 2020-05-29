const express = require("express");
const router = express.Router();

// Modules
const bankRouter = require("./modules/bank/bank.router");
const bankAccountRouter = require("./modules/bank_account/bankAccount.router");
const historicStatusRouter = require("./modules/hst_sta/historicStatus.router");
const internationalization = require("./modules/internationalization/internationalization.router");
const invoiceRouter = require("./modules/invoice/invoice.router");
const levelRouter = require("./modules/level/level.router");
const offerRouter = require("./modules/offer/offer.router");
const paymentRouter = require("./modules/payment/payment.router");
const placeRouter = require("./modules/place/place.router");
const productRouter = require("./modules/product/product.router");
const roleRouter = require("./modules/role/role.router");
const settingsRouter = require("./modules/settings/settings.router");
const statusRouter = require("./modules/status/status.router");
const userRouter = require("./modules/user/user.router");
const userOfferRouter = require("./modules/user_offer/userOffer.router");
const validationRouter = require("./modules/validation/validation.router");
const withdrawRouter = require("./modules/withdraw/withdraw.router");

// Routes
router.use("/bank", bankRouter);
router.use("/user/bank/account", bankAccountRouter);
router.use("/status/historic", historicStatusRouter);
router.use("/internationalization", internationalization);
router.use("/invoice", invoiceRouter);
router.use("/level", levelRouter);
router.use("/offer", offerRouter);
router.use("/payment", paymentRouter);
router.use("/place", placeRouter);
router.use("/product", productRouter);
router.use("/role", roleRouter);
router.use("/settings", settingsRouter);
router.use("/status", statusRouter);
router.use("/user", userRouter);
router.use("/user/offer", userOfferRouter);
router.use("/validation", validationRouter);
router.use("/withdraw", withdrawRouter);

module.exports = router;
