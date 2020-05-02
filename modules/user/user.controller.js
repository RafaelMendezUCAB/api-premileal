const createError = require("http-errors");
const userModel = require("./user.model");
const logger = require("../../logger");

module.exports = {
  getAllUsers: async (req, res, next) => {
    let results = await userModel.getAllUsers(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "user" (GET /all)');
      next(createError(500, "Error. Couldn't obtain users from database."));
    } else {
      logger.info("List of registered users.");
      res.json(results);
    }
  },
};
