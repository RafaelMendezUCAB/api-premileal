const express = require("express");
const router = express.Router();
const internationalizationController = require("./internationalization.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/:lang", /*auth.validateToken ,*/ internationalizationController.getLanguageTerms);

module.exports = router;