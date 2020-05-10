const express = require("express");
const router = express.Router();
const validationController = require("./validation.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ validationController.getAllValidations);
router.get("/:id", /*auth.validateToken ,*/ validationController.getValidation);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ validationController.createValidation);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ validationController.updateValidation);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ validationController.deleteValidation);

module.exports = router;
