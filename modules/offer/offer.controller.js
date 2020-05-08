const createError = require("http-errors");
const offerModel = require("./offer.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllOffers: async (req, res, next) => {
    let results = await offerModel.getAllOffers(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "offer" (GET /all)');
      next(createError(500, "Error. Couldn't obtain offers from database."));
    } else {
      logger.info("List of registered offers.");
      res.json(results);
    }
  },

  getOffer: async (req, res, next) => {
    let results = await offerModel.getOffer(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "offer" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain offer from database."));
    } else {
      logger.info("Registered offer list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
  postOffer: async (req, res, next) => {
    const offer = req.body;
    let results = await offerModel.postOffer(req.con,offer);
    if (results instanceof Error) {
      logger.error('Error in module "offer" (POST /create)');
      next(createError(500, "Error. Could't create offer from database."));
    } else {
      logger.info("Offer created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
  putOffer: async (req, res, next) => {
    const offer = req.body;
    let results = await offerModel.putOffer(req.con,req.params.id,offer);
    if (results instanceof Error) {
      logger.error(`Error in module "offer" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update offer from database."));
    } else {
      logger.info("Updated Offer.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteOffer: async (req, res, next) => {
    let results = await offerModel.deleteOffer(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "offer" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove offer from database."));
    } else {
      logger.info("Offer deleted.");
      res.json(results);
    }
  },
};
