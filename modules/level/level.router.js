const express = require("express");
const router = express.Router();
const levelController = require("./level.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ levelController.getAllLevels);
router.get("/:id", /*auth.validateToken ,*/ levelController.getLevel);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ levelController.createLevel);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ levelController.updateLevel);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ levelController.deleteLevel);

module.exports = router;
