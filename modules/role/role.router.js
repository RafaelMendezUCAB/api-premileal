const express = require("express");
const router = express.Router();
const roleController = require("./role.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ roleController.getAllRoles);
router.get("/:id", /*auth.validateToken ,*/ roleController.getRole);
router.post("/create", /*auth.validateToken ,*/ roleController.postRole);
router.put("/update/:id", /*auth.validateToken ,*/ roleController.putRole);
router.delete("/delete/:id", /*auth.validateToken ,*/ roleController.deleteRole);

module.exports = router;
