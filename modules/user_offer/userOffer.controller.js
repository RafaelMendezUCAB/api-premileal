const createError = require("http-errors");
const userOfferModel = require("./userOffer.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllUserOffers: async (req, res, next) => {
    let results = await userOfferModel.getAllUserOffers(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "UserOffer" (GET /all)');
      next(createError(500, "Error. Couldn't obtain UserOffers from database."));
    } else {
      logger.info("List of registered UserOffers.");
      res.json(results);
    }
  },

  getUserOffer: async (req, res, next) => {
    let results = await userOfferModel.getUserOffer(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "UserOffer" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain UserOffer from database."));
    } else {
      logger.info("Registered UserOffer list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
  postUserOffer: async (req, res, next) => {
    const userOffer = req.body;
    let results = await userOfferModel.postUserOffer(req.con,userOffer);
    if (results instanceof Error) {
      logger.error('Error in module "UserOffer" (POST /create)');
      next(createError(500, "Error. Could't create UserOffer from database."));
    } else {
      logger.info("UserOffer created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
  putUserOffer: async (req, res, next) => {
    const userOffer = req.body;
    let results = await userOfferModel.putUserOffer(req.con,req.params.id,userOffer);
    if (results instanceof Error) {
      logger.error(`Error in module "UserOffer" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update UserOffer from database."));
    } else {
      logger.info("Updated UserOffer.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteUserOffer: async (req, res, next) => {
    let results = await userOfferModel.deleteUserOffer(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "UserOffer" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove UserOffer from database."));
    } else {
      logger.info("UserOffer deleted.");
      res.json(results);
    }
  },
};
