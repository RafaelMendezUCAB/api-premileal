const createError = require("http-errors");
const historicStatusModel = require("./historicStatus.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllHistoricStatus: async (req, res, next) => {
    let results = await historicStatusModel.getAllHistoricStatus(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "HistoricStatus" (GET /all)');
      next(createError(500, "Error. Couldn't obtain HistoricStatus from database."));
    } else {
      logger.info("List of registered HistoricStatuss.");
      res.json(results);
    }
  },

  getHistoricStatus: async (req, res, next) => {
    let results = await historicStatusModel.getHistoricStatus(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "HistoricStatus" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain HistoricStatus from database."));
    } else {
      logger.info("Registered HistoricStatus list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
  createHistoricStatus: async (req, res, next) => {
    const historicStatus = req.body;
    let results = await historicStatusModel.createHistoricStatus(req.con, historicStatus);
    if (results instanceof Error) {
      logger.error('Error in module "HistoricStatus" (POST /create)');
      next(createError(500, "Error. Could't create HistoricStatus from database."));
    } else {
      logger.info("HistoricStatus created.");
      res.json(results);
    }
  },

  createUserStatus: async (req, res, next) => {
    const userStatus = req.body;
    if (userStatus.statusID == 4) {
      let results = await historicStatusModel.createUserStatus(req.con, req.params.idUser, userStatus);
      if (results instanceof Error) {
        logger.error(`Error in module "HistoricStatus" (POST /userStatus/${req.params.idUser})`);
        next(createError(500, `Error. Could't block user ${req.params.idUser} from database.`));
      } else {
        logger.info("User blocked.");
        res.json(results);
      } 
    } else {
      let results = await historicStatusModel.createUserStatus(req.con, req.params.idUser, userStatus);
      if (results instanceof Error) {
        logger.error(`Error in module "HistoricStatus" (POST /userStatus/${req.params.idUser})`);
        next(createError(500, `Error. Could't activate user account ${req.params.idUser} from database.`));
      } else {
        logger.info("Activated user account.");
        res.json(results);
      } 
    }
  },

  createBankAccountStatus: async (req, res, next) => {
    const bankAccountStatus = req.body;
    if (bankAccountStatus.statusID == 4) {
      let results = await historicStatusModel.createBankAccountStatus(req.con, req.params.idBankAccount, bankAccountStatus);
      if (results instanceof Error) {
        logger.error(`Error in module "HistoricStatus" (POST /bankAccountStatus/${req.params.idBankAccount})`);
        next(createError(500, "Error. Could't lock the bank account from database."));
      } else {
        logger.info("Bank account blocked.");
        res.json(results);
      } 
    } else {
      let results = await historicStatusModel.createBankAccountStatus(req.con, req.params.idBankAccount, bankAccountStatus);
      if (results instanceof Error) {
        logger.error(`Error in module "HistoricStatus" (POST /bankAccountStatus/${req.params.idBankAccount})`);
        next(createError(500, "Error. Could't activate the bank account from database."));
      } else {
        logger.info("Bank account activated.");
        res.json(results);
      } 
    } 
  },

/* -------------------------- PUT ---------------------------- */
  updateHistoricStatus: async (req, res, next) => {
    const historicStatus = req.body;
    let results = await historicStatusModel.updateHistoricStatus(req.con, req.params.id, historicStatus);
    if (results instanceof Error) {
      logger.error(`Error in module "HistoricStatus" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update HistoricStatus from database."));
    } else {
      logger.info("Updated HistoricStatus.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteHistoricStatus: async (req, res, next) => {
    let results = await historicStatusModel.deleteHistoricStatus(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "HistoricStatus" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove HistoricStatus from database."));
    } else {
      logger.info("HistoricStatus deleted.");
      res.json(results);
    }
  },
};
