const createError = require("http-errors");
const placeModel = require("./place.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllPlaces: async (req, res, next) => {
    let results = await placeModel.getAllPlaces(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "place" (GET /all)');
      next(createError(500, "Error. Couldn't obtain places from database."));
    } else {
      logger.info("List of registered places.");
      res.json(results);
    }
  },

  getPlace: async (req, res, next) => {
    let results = await placeModel.getPlace(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "place" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain place from database."));
    } else {
      logger.info("Registered place list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
createPlace: async (req, res, next) => {
    const place = req.body;
    let results = await placeModel.createPlace(req.con,place);
    if (results instanceof Error) {
      logger.error('Error in module "place" (POST /create)');
      next(createError(500, "Error. Could't create place from database."));
    } else {
      logger.info("Place created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
updatePlace: async (req, res, next) => {
    const place = req.body;
    let results = await placeModel.updatePlace(req.con,req.params.id,place);
    if (results instanceof Error) {
      logger.error(`Error in module "place" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update place from database."));
    } else {
      logger.info("Updated place.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deletePlace: async (req, res, next) => {
    let results = await placeModel.deletePlace(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "place" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove place from database."));
    } else {
      logger.info("Place deleted.");
      res.json(results);
    }
  },
};
