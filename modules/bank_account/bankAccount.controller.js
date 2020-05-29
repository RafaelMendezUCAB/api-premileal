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
    } 
    else if(results === 'No bank accounts registered.'){      
      res.send("No bank accounts registered.");
    }
    else {
      logger.info(`List of registered bank accounts for user ${req.params.idUser}.`);
      res.json(results);
    }
  },

  getBankAccountStatus: async (req, res, next) => {
    let results = await bankAccountModel.getBankAccountStatus(req.con, req.params.bankAccountID);
    if (results instanceof Error) {
      logger.error(`Error in module "BankAccount" (GET /status/${req.params.bankID})`);
      next(createError(500, "Error. Couldn't obtain bank status from database."));
    } else {
      logger.info(`Bank account status retreived successfully.`);
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
      if(results === 'Bank account already exists.'){
        res.send('Bank account already exists.');
      }
      else if(results === 'Bank account created.'){
        logger.info("Bank account created.");
        res.send(results);
      }
      else {
        logger.info("Bank account could not be created.");
        res.send("An error ocurred.");
      }      
    }
  },

/* -------------------------- PUT ---------------------------- */
  updateBankAccount: async (req, res, next) => {
    const data = req.body;
    let results = await bankAccountModel.updateBankAccount(req.con, req.params.id, data);
    if (results instanceof Error) {
      logger.error(`Error in module "BankAccount" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update bank account from database."));
    } 
    else if(results === "Bank Account successfully updated."){
      logger.info(results)
      res.send(results);
    }
    else {
      logger.info("Error. Could't update bank account from database.");
      res.send("Error. Could't update bank account from database.");
    }
  },

  verifyBankAccount: async (req, res, next) => {
    const bankAccount = req.body;
    let results = await bankAccountModel.verifyBankAccount(req.con, req.params.id, bankAccount);
    if (results instanceof Error) {
      logger.error(`Error in module "BankAccount" (PUT /verify/${req.params.id})`);
      next(createError(500, "Error. Could't verify bank account."));
    } else {
      if(results === 'Sucessfull validation.'){
        res.send('Sucessfull validation.');
      }
      else if (results === 'Invalid amounts.'){
        res.send('Invalid amounts.');
      }
      else {
        logger.info("Couldn't verify bank account.");
        res.send("An error has ocurred.");
      }      
    }
  },

  setBankAccountPrimary: async (req, res, next) => {
    let results = await bankAccountModel.setBankAccountPrimary(req.con, req.params.accountid, req.params.userid);
    if (results instanceof Error) {
      logger.error(`Error in module "BankAccount" (DELETE /set/primary/${req.params.accountid}/${req.params.userid})`);
      next(createError(500, "Error. Could't sset bank account as primary from database."));
    }
    else if (results === "Bank Account now is primary."){
      logger.info("Bank Account now is primary.");
      res.send("Bank Account now is primary.");
    }
    else {
      logger.info("Bank account couldn't be set as primary.");
      res.send("Bank account couldn't be set as primary.");
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteBankAccount: async (req, res, next) => {
    let results = await bankAccountModel.deleteBankAccount(req.con, req.params.id, req.body);
    if (results instanceof Error) {
      logger.error(`Error in module "BankAccount" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove bank account from database."));
    } 
    else if(results === "Bank Account successfully deleted."){
      logger.info(results);
      res.send(results);
    }
    else {
      logger.info("Error. Could't remove bank account from database.");
      res.se("Error. Could't remove bank account from database.");
    }
  },
};
