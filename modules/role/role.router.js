const express = require("express");
const router = express.Router();
const roleController = require("./role.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", roleController.getAllRoles);
router.get("/:id", roleController.getRole);

/* ------------------------- POST -------------------------- */
router.post("/create", roleController.createRole);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", roleController.updateRole);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", roleController.deleteRole);

module.exports = router;
