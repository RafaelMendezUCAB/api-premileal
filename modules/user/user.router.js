const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ userController.getAllUsers);
router.get("/:id", /*auth.validateToken ,*/ userController.getUser);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ userController.createUser);
router.post("/signup", /*auth.validateToken,*/ userController.registerUser); // works for both: federated and not federated.

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ userController.updateUser);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ userController.deleteUser);

module.exports = router;
