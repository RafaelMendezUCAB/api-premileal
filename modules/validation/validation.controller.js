const createError = require("http-errors");
const validationModel = require("./validation.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllValidations: async (req, res, next) => {
    let results = await validationModel.getAllValidations(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "validation" (GET /all)');
      next(createError(500, "Error. Couldn't obtain validations from database."));
    } else {
      logger.info("List of registered validations.");
      res.json(results);
    }
  },

  getValidation: async (req, res, next) => {
    let results = await validationModel.getValidation(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "validation" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain validation from database."));
    } else {
      logger.info("Registered validation list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
  postValidation: async (req, res, next) => {
    const validation = req.body;
    let results = await validationModel.postValidation(req.con,validation);
    if (results instanceof Error) {
      logger.error('Error in module "validation" (POST /create)');
      next(createError(500, "Error. Could't create validation from database."));
    } else {
      logger.info("Validation created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
  putValidation: async (req, res, next) => {
    const validation = req.body;
    let results = await validationModel.putValidation(req.con,req.params.id,validation);
    if (results instanceof Error) {
      logger.error(`Error in module "validation" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update validation from database."));
    } else {
      logger.info("Updated validation.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteValidation: async (req, res, next) => {
    let results = await validationModel.deleteValidation(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "validation" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove validation from database."));
    } else {
      logger.info("Validation deleted.");
      res.json(results);
    }
  },
};
