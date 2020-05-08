const createError = require("http-errors");
const invoiceModel = require("./invoice.model");
const logger = require("../../logger");

module.exports = {
	/* --------------------------- GET ------------------------- */
  getAllInvoices: async (req, res, next) => {
    let results = await invoiceModel.getAllInvoices(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "invoice" (GET /all)');
      next(createError(500, "Error. Couldn't obtain invoices from database."));
    } else {
      logger.info("List of registered invoices.");
      res.json(results);
    }
  },

  getInvoice: async (req, res, next) => {
    let results = await invoiceModel.getInvoice(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "invoice" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain invoice from database."));
    } else {
      logger.info("Registered invoice list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
  postInvoice: async (req, res, next) => {
    const invoice = req.body;
    let results = await invoiceModel.postInvoice(req.con,invoice);
    if (results instanceof Error) {
      logger.error('Error in module "invoice" (POST /create)');
      next(createError(500, "Error. Could't create invoice from database."));
    } else {
      logger.info("Invoice created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
  putInvoice: async (req, res, next) => {
    const invoice = req.body;
    let results = await invoiceModel.putInvoice(req.con,req.params.id,invoice);
    if (results instanceof Error) {
      logger.error(`Error in module "invoice" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update invoice from database."));
    } else {
      logger.info("Updated invoice.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteInvoice: async (req, res, next) => {
    let results = await invoiceModel.deleteInvoice(req.con,req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "invoice" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove invoice from database."));
    } else {
      logger.info("Invoice deleted.");
      res.json(results);
    }
  },
};
