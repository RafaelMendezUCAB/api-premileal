const express = require("express");
const router = express.Router();
const validationController = require("./validation.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ validationController.getAllValidations);
router.get("/:id", /*auth.validateToken ,*/ validationController.getValidation);
router.post("/create", /*auth.validateToken ,*/ validationController.postValidation);
router.put("/update/:id", /*auth.validateToken ,*/ validationController.putValidation);
router.delete("/delete/:id", /*auth.validateToken ,*/ validationController.deleteValidation);

module.exports = router;
