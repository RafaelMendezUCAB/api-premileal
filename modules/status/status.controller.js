const createError = require("http-errors");
const statusModel = require("./status.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllStatus: async (req, res, next) => {
    let results = await statusModel.getAllStatus(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "status" (GET /all)');
      next(createError(500, "Error. Couldn't obtain Status from database."));
    } else {
      logger.info("List of registered status.");
      res.json(results);
    }
  },

  getStatus: async (req, res, next) => {
    let results = await statusModel.getStatus(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "status" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain status from database."));
    } else {
      logger.info("Registered status list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
  postStatus: async (req, res, next) => {
    const status = req.body;
    let results = await statusModel.postStatus(req.con,status);
    if (results instanceof Error) {
      logger.error('Error in module "status" (POST /create)');
      next(createError(500, "Error. Could't create status from database."));
    } else {
      logger.info("Status created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
  putStatus: async (req, res, next) => {
    const status = req.body;
    let results = await statusModel.putStatus(req.con,req.params.id,status);
    if (results instanceof Error) {
      logger.error(`Error in module "status" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update status from database."));
    } else {
      logger.info("Updated status.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteStatus: async (req, res, next) => {
    let results = await statusModel.deleteStatus(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "status" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove status from database."));
    } else {
      logger.info("Status deleted.");
      res.json(results);
    }
  },
};
