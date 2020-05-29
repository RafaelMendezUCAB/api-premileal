const express = require("express");
const router = express.Router();
const statusController = require("./status.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", statusController.getAllStatus);
router.get("/:id", statusController.getStatus);

/* ------------------------- POST -------------------------- */
router.post("/create", statusController.createStatus);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", statusController.updateStatus);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", statusController.deleteStatus);

module.exports = router;
