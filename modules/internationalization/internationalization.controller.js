const createError = require("http-errors");
const internationalizationModel = require("./internationalization.model");
const logger = require("../../logger");

module.exports = {
/* --------------------------- GET ------------------------- */
  getLanguageTerms: async (req, res, next) => {
    const language = req.params.lang;
    let results = await internationalizationModel.getLanguageTerms(req.con, language);
    if (results instanceof Error) {
      logger.error('Error in module "offer" (GET /all)');
      next(createError(500, "Error. Couldn't obtain offers from database."));
    } else {
      logger.info("List of terms retrieved.");
      res.json(results);
    }
  }, 

}

/* ------------------------- POST --------------------------- */


/* -------------------------- PUT ---------------------------- */


/* ------------------------- DELETE -------------------------- */
