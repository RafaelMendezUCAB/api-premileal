const createError = require("http-errors");
const roleModel = require("./role.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getAllRoles: async (req, res, next) => {
    let results = await roleModel.getAllRoles(req.con);
    if (results instanceof Error) {
      logger.error('Error in module "role" (GET /all)');
      next(createError(500, "Error. Couldn't obtain roles from database."));
    } else {
      logger.info("List of registered roles.");
      res.json(results);
    }
  },

  getRole: async (req, res, next) => {
    let results = await roleModel.getRole(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "role" (GET /${req.params.id})`);
      next(createError(500, "Error. Couldn't obtain role from database."));
    } else {
      logger.info("Registered role list.");
      res.json(results);
    }
  },

/* ------------------------- POST --------------------------- */
createRole: async (req, res, next) => {
    const role = req.body;
    let results = await roleModel.createRole(req.con, role);
    if (results instanceof Error) {
      logger.error('Error in module "role" (POST /create)');
      next(createError(500, "Error. Could't create role from database."));
    } else {
      logger.info("role created.");
      res.json(results);
    }
  },

/* -------------------------- PUT ---------------------------- */
updateRole: async (req, res, next) => {
    const role = req.body;
    let results = await roleModel.updateRole(req.con, req.params.id, role);
    if (results instanceof Error) {
      logger.error(`Error in module "role" (PUT /update/${req.params.id})`);
      next(createError(500, "Error. Could't update role from database."));
    } else {
      logger.info("Updated role.");
      res.json(results);
    }
  },

/* ------------------------- DELETE -------------------------- */
  deleteRole: async (req, res, next) => {
    let results = await roleModel.deleteRole(req.con, req.params.id);
    if (results instanceof Error) {
      logger.error(`Error in module "role" (DELETE /delete/${req.params.id})`);
      next(createError(500, "Error. Could't remove role from database."));
    } else {
      logger.info("role deleted.");
      res.json(results);
    }
  },
};
