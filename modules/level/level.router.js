const express = require("express");
const router = express.Router();
const levelController = require("./level.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", levelController.getAllLevels);
router.get("/:id", levelController.getLevel);

/* ------------------------- POST -------------------------- */
router.post("/create", levelController.createLevel);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", levelController.updateLevel);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", levelController.deleteLevel);

module.exports = router;
