const express = require("express");
const router = express.Router();
const settingsController = require("./settings.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", settingsController.getAllSettings);
router.get("/:id", settingsController.getSetting);

/* ------------------------- POST -------------------------- */
router.post("/create", settingsController.createSettings);

/* -------------------------- PUT ---------------------------- */
router.put("/update", settingsController.updateSettings);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", settingsController.deleteSettings);

module.exports = router;
