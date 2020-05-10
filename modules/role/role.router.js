const express = require("express");
const router = express.Router();
const roleController = require("./role.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ roleController.getAllRoles);
router.get("/:id", /*auth.validateToken ,*/ roleController.getRole);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ roleController.createRole);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ roleController.updateRole);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ roleController.deleteRole);

module.exports = router;
