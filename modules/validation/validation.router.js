const express = require("express");
const router = express.Router();
const validationController = require("./validation.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", validationController.getAllValidations);
router.get("/:id", validationController.getValidation);

/* ------------------------- POST -------------------------- */
router.post("/create", validationController.createValidation);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", validationController.updateValidation);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", validationController.deleteValidation);

module.exports = router;
