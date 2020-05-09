const createError = require("http-errors");
const paymentModel = require("./payment.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllPayments: async (req, res, next) => {
    let results = await paymentModel.getAllPayments(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "payment" (GET /all)');
      next(createError(500, "Error. Couldn't obtain payments from database."));
    } else {
      logger.info("List of registered payments.");
      res.json(results);
    }
  },

  getPayment: async (req, res, next) => {
    let results = await paymentModel.getPayment(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "payment" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain payment from database."));
    } else {
      logger.info("Registered payment list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
  postPayment: async (req, res, next) => {
    const payment = req.body;
    let results = await paymentModel.postPayment(req.con,payment);
    if (results instanceof Error) {
      logger.error('Error in module "payment" (POST /create)');
      next(createError(500, "Error. Could't create payment from database."));
    } else {
      logger.info("Payment created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
  putPayment: async (req, res, next) => {
    const payment = req.body;
    let results = await paymentModel.putPayment(req.con,req.params.id,payment);
    if (results instanceof Error) {
      logger.error(`Error in module "payment" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update payment from database."));
    } else {
      logger.info("Updated payment.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deletePayment: async (req, res, next) => {
    let results = await paymentModel.deletePayment(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "payment" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove payment from database."));
    } else {
      logger.info("Payment deleted.");
      res.json(results);
    }
  },
};
