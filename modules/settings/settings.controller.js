const createError = require("http-errors");
const settingsModel = require("./settings.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllSettings: async (req, res, next) => {
    let results = await settingsModel.getAllSettings(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "settings" (GET /all)');
      next(createError(500, "Error. Couldn't obtain settings from database."));
    } else {
      logger.info("List of registered settings.");
      res.json(results);
    }
  },

  getSetting: async (req, res, next) => {
    let results = await settingsModel.getSetting(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "settings" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain settings from database."));
    } else {
      logger.info("Registered settings list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
createSettings: async (req, res, next) => {
    const settings = req.body;
    let results = await settingsModel.createSettings(req.con, settings);
    if (results instanceof Error) {
      logger.error('Error in module "settings" (POST /create)');
      next(createError(500, "Error. Could't create settings from database."));
    } else {
      logger.info("Settings created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
updateSettings: async (req, res, next) => {
    const settings = req.body;
    let results = await settingsModel.updateSettings(req.con, req.params.id, settings);
    if (results instanceof Error) {
      logger.error(`Error in module "settings" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update settings from database."));
    } else {
      logger.info("Updated Settings.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteSettings: async (req, res, next) => {
    let results = await settingsModel.deleteSettings(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "settings" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove settings from database."));
    } else {
      logger.info("Settings deleted.");
      res.json(results);
    }
  },
};
