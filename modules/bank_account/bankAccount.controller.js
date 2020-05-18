const createError = require("http-errors");
const bankAccountModel = require("./bankAccount.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllBankAccounts: async (req, res, next) => {
    let results = await bankAccountModel.getAllBankAccounts(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "BankAccount" (GET /all)');
      next(createError(500, "Error. Couldn't obtain bank accounts from database."));
    } else {
      logger.info("List of registered bank accounts.");
      res.json(results);
    }
  },

  getBankAccount: async (req, res, next) => {
    let results = await bankAccountModel.getBankAccount(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "BankAccount" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain bank account from database."));
    } else {
      logger.info("Registered bank account list.");
      res.json(results);
    }
  },

  getAllUserBankAccounts: async (req, res, next) => {
    let results = await bankAccountModel.getAllUserBankAccounts(req.con, req.params.idUser);
    if (results instanceof Error) {
      logger.error(`Error in module "BankAccount" (GET bankAccount/all/${req.params.idUser})`);
      next(createError(500, "Error. Couldn't obtain bank accounts from database."));
    } else {
      logger.info(`List of registered bank accounts in the user ${req.params.idUser}.`);
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
createBankAccount: async (req, res, next) => {
    const bankAccount = req.body;
    let results = await bankAccountModel.createBankAccount(req.con, bankAccount);
    if (results instanceof Error) {
      logger.error('Error in module "BankAccount" (POST /create)');
      next(createError(500, "Error. Could't create bank account from database."));
    } else {
      logger.info("Bank account created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
  updateBankAccount: async (req, res, next) => {
    const bankAccount = req.body;
    let results = await bankAccountModel.updateBankAccount(req.con, req.params.id, bankAccount);
    if (results instanceof Error) {
      logger.error(`Error in module "BankAccount" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update bank account from database."));
    } else {
      logger.info("Updated bank account.");
      res.json(results);
    }
  },

  verifyBankAccount: async (req, res, next) => {
    const bankAccount = req.body;
    let results = await bankAccountModel.verifyBankAccount(req.con, req.params.id, bankAccount);
    if (results instanceof Error) {
      logger.error(`Error in module "BankAccount" (PUT /verify/${req.params.id})`);
      next(createError(500, "Error. Could't verify bank account."));
    } else {
      logger.info("Verified bank account.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteBankAccount: async (req, res, next) => {
    let results = await bankAccountModel.deleteBankAccount(req.con, req.params.id, req.body);
    if (results instanceof Error) {
      logger.error(`Error in module "BankAccount" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove bank account from database."));
    } else {
      logger.info("Bank account deleted.");
      res.json(results);
    }
  },
};
