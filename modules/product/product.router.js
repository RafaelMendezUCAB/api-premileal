const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ productController.getAllProducts);
router.get("/:id", /*auth.validateToken ,*/ productController.getProduct);
router.post("/create", /*auth.validateToken ,*/ productController.postProduct);
router.put("/update/:id", /*auth.validateToken ,*/ productController.putProduct);
router.delete("/delete/:id", /*auth.validateToken ,*/ productController.deleteProduct);

module.exports = router;
