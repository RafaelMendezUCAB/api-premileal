const createError = require("http-errors");
const withdrawModel = require("./withdraw.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllWithdraws: async (req, res, next) => {
    let results = await withdrawModel.getAllWithdraws(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "withdraw" (GET /all)');
      next(createError(500, "Error. Couldn't obtain withdraws from database."));
    } else {
      logger.info("List of registered withdraws.");
      res.json(results);
    }
  },

  getWithdraw: async (req, res, next) => {
    let results = await withdrawModel.getWithdraw(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "withdraw" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain withdraw from database."));
    } else {
      logger.info("Registered withdraw list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
createWithdraw: async (req, res, next) => {
    const withdraw = req.body;
    let results = await withdrawModel.createWithdraw(req.con, withdraw);
    if (results instanceof Error) {
      logger.error('Error in module "withdraw" (POST /create)');
      next(createError(500, "Error. Could't create withdraw from database."));
    } else {
      logger.info("Withdraw created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
updateWithdraw: async (req, res, next) => {
    const withdraw = req.body;
    let results = await withdrawModel.updateWithdraw(req.con, req.params.id, withdraw);
    if (results instanceof Error) {
      logger.error(`Error in module "withdraw" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update withdraw from database."));
    } else {
      logger.info("Updated withdraw.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteWithdraw: async (req, res, next) => {
    let results = await withdrawModel.deleteWithdraw(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "withdraw" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove withdraw from database."));
    } else {
      logger.info("Withdraw deleted.");
      res.json(results);
    }
  },
};
