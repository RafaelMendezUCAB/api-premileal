const createError = require("http-errors");
const userModel = require("./user.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
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

  getUser: async (req, res, next) => {
    let results = await userModel.getUser(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "user" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain user from database."));
    } else {
      logger.info("Registered user list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
  postUser: async (req, res, next) => {
    const user = req.body;
    let results = await userModel.postUser(req.con,user);
    if (results instanceof Error) {
      logger.error('Error in module "user" (POST /create)');
      next(createError(500, "Error. Could't create user from database."));
    } else {
      logger.info("User created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
  putUser: async (req, res, next) => {
    const user = req.body;
    let results = await userModel.putUser(req.con,req.params.id,user);
    if (results instanceof Error) {
      logger.error(`Error in module "user" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update user from database."));
    } else {
      logger.info("Updated user.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteUser: async (req, res, next) => {
    let results = await userModel.deleteUser(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "user" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove user from database."));
    } else {
      logger.info("User Deleted.");
      res.json(results);
    }
  },
};
