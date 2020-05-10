const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ productController.getAllProducts);
router.get("/:id", /*auth.validateToken ,*/ productController.getProduct);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ productController.createProduct);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ productController.updateProduct);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ productController.deleteProduct);

module.exports = router;
