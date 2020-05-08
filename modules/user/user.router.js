const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middlewares/auth");

router.get("/all", /*auth.validateToken ,*/ userController.getAllUsers);
router.get("/:id", /*auth.validateToken ,*/ userController.getUser);
router.post("/create", /*auth.validateToken ,*/ userController.postUser);
router.put("/update/:id", /*auth.validateToken ,*/ userController.putUser);
router.delete("/delete/:id", /*auth.validateToken ,*/ userController.deleteUser);

module.exports = router;
