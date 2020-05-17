const createError = require("http-errors");
const bankModel = require("./bank.model");

module.exports = {

    getAllBanks: async (req, res, next) => {
      let results = await bankModel.getAllBanks(req.con);
      if (results instanceof Error) {
        logger.error('Error in module "Bank" (GET /all)');
        next(createError(500, "Error. Couldn't obtain banks from database."));
      } else {
        logger.info("List of registered banks.");
        res.json(results);
      }
    },

}