const express = require("express");
const router = express.Router();
const internationalizationController = require("./internationalization.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/:lang", internationalizationController.getLanguageTerms);

module.exports = router;