const createError = require("http-errors");
const levelModel = require("./level.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllLevels: async (req, res, next) => {
    let results = await levelModel.getAllLevels(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "level" (GET /all)');
      next(createError(500, "Error. Couldn't obtain levels from database."));
    } else {
      logger.info("List of registered levels.");
      res.json(results);
    }
  },

  getLevel: async (req, res, next) => {
    let results = await levelModel.getLevel(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "level" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain level from database."));
    } else {
      logger.info("Registered level list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
createLevel: async (req, res, next) => {
    const level = req.body;
    let results = await levelModel.createLevel(req.con, level);
    if (results instanceof Error) {
      logger.error('Error in module "level" (POST /create)');
      next(createError(500, "Error. Could't create level from database."));
    } else {
      logger.info("Level created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
  updateLevel: async (req, res, next) => {
    const level = req.body;
    let results = await levelModel.updateLevel(req.con, req.params.id, level);
    if (results instanceof Error) {
      logger.error(`Error in module "level" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update level from database."));
    } else {
      logger.info("Updated Level.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteLevel: async (req, res, next) => {
    let results = await levelModel.deleteLevel(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "level" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove level from database."));
    } else {
      logger.info("Level deleted.");
      res.json(results);
    }
  },
};
