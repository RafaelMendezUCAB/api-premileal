const express = require("express");
const router = express.Router();
const productController = require("./product.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getProduct);

/* ------------------------- POST -------------------------- */
router.post("/create", productController.createProduct);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", productController.updateProduct);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
