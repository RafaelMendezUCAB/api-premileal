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
    let results = await userModel.getUser(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "user" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain user from database."));
    } else {
      if(results.length === 0){
        res.send("Users doesn't exists.");
      }
      else {
        logger.info("User data retrieved successfully.");
        res.json(results);
      }      
    }
  },

  login: async(req, res, next) => {
    let results = await userModel.login(req.con, req.params.email, req.params.password);
    if (results instanceof Error) {
      logger.error('Error in module "user" (GET /login)');
      next(createError(500, "Error. Couldn't retreive user data."));
    } else {
      if(results.length === 0){
        res.send("Users doesn't exists.");
      }
      else {
        logger.info("User data retrieved successfully.");
        res.json(results);
      }  
    }
  },

  socialLogin: async(req, res, next) => {
    let results = await userModel.socialLogin(req.con, req.params.email, req.params.type);
    if (results instanceof Error) {
      logger.error('Error in module "user" (GET /socialLogin)');
      next(createError(500, "Error. Couldn't retreive user data."));
    } else {
      if(results.length === 0){
        res.send("Users doesn't exists.");
      }
      else {
        logger.info("User data retrieved successfully.");
        res.json(results);
      }      
    }
  },

/* ------------------------- POST --------------------------- */
  createUser: async (req, res, next) => {
    const user = req.body;
    let results = await userModel.createUser(req.con, req.connection.remoteAddress, user);
    if (results instanceof Error) {
      logger.error('Error in module "user" (POST /create)');
      next(createError(500, "Error. Could't create user from database."));
    } else {
      if(results === 'User email already exists.'){
        res.send(results);
      }
      else {
        logger.info("User created.");
        res.json(results);
      }      
    }
  },  

/* -------------------------- PUT ---------------------------- */
  updateUser: async (req, res, next) => {
    const user = req.body;
    let results = await userModel.updateUser(req.con, req.params.id, user);
    if (results instanceof Error) {
      logger.error(`Error in module "user" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update user from database."));
    } else {
      logger.info("Updated user.");
      res.json(results);
    }
  },

  updatePoints: async (req, res, next) => {
    const userPoints = req.body;
    let results = await userModel.updatePoints(req.con, req.params.id, userPoints);
    if (results instanceof Error) {
      logger.error(`Error in module "user" (PUT /points/${req.params.id})`);
      next(createError(500, "Error. Could't update user points from database."));
    } else {
      logger.info("Updated user points.");
      res.json(results);
    }
  },
  
  addPoints: async (req, res, next) => {
    const userPoints = req.body;
    let results = await userModel.addPoints(req.con, req.params.id, userPoints);
    if (results instanceof Error) {
      logger.error(`Error in module "user" (PUT /addPoints/${req.params.id})`);
      next(createError(500, "Error. Could't add points to user in database."));
    } else {
      logger.info("Updated user points.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteUser: async (req, res, next) => {
    let results = await userModel.deleteUser(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "user" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove user from database."));
    } else {
      logger.info("User deleted.");
      res.json(results);
    }
  },
};
