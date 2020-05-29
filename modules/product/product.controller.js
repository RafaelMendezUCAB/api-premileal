const createError = require("http-errors");
const productModel = require("./product.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllProducts: async (req, res, next) => {
    let results = await productModel.getAllProducts(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "product" (GET /all)');
      next(createError(500, "Error. Couldn't obtain products from database."));
    } else {
      logger.info("List of registered products.");
      res.json(results);
    }
  },

  getProduct: async (req, res, next) => {
    let results = await productModel.getProduct(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "product" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain product from database."));
    } else {
      logger.info("Registered product list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
createProduct: async (req, res, next) => {
    const product = req.body;
    let results = await productModel.createProduct(req.con, product);
    if (results instanceof Error) {
      logger.error('Error in module "product" (POST /create)');
      next(createError(500, "Error. Could't create product from database."));
    } else {
      logger.info("Product created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
updateProduct: async (req, res, next) => {
    const product = req.body;
    let results = await productModel.updateProduct(req.con, req.params.id, product);
    if (results instanceof Error) {
      logger.error(`Error in module "product" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update product from database."));
    } else {
      logger.info("Updated product.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteProduct: async (req, res, next) => {
    let results = await productModel.deleteProduct(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "product" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove product from database."));
    } else {
      logger.info("Product deleted.");
      res.json(results);
    }
  },
};
