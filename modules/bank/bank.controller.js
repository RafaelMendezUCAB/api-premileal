const createError = require("http-errors");
const bankModel = require("./bank.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
    getAllBanks: async (req, res, next) => {
      let results = await bankModel.getAllBanks(req.con);
      if (results instanceof Error) {
        logger.error('Error in module "Bank" (GET /all)');
        next(createError(500, "Error. Couldn't obtain banks from database."));
      } else {
        if(results.length === 0){
          res.send("No banks registered.")
        }
        else {
          logger.info("List of registered banks.");
          res.json(results);
        }        
      }
    },

    getRoutingNumbers: async (req, res, next) => {
      let results = await bankModel.getRoutingNumbers(req.con, req.params.bank);
      if (results instanceof Error) {
        logger.error('Error in module "Bank" (GET /routing/numbers/:id)');
        next(createError(500, "Error. Couldn't obtain routing numbers from database."));
      } else {
        if(results.length === 0){
          res.send("No routing numbers registered for bank.")
        }
        else {
          logger.info("List of routing numbers registered for bank.");
          res.json(results);
        }        
      }
    },

/* ------------------------- POST --------------------------- */

/* -------------------------- PUT ---------------------------- */

/* ------------------------- DELETE -------------------------- */

}