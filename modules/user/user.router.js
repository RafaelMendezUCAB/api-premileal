const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", /*auth.validateToken ,*/ userController.getAllUsers);
router.get("/:id", /*auth.validateToken ,*/ userController.getUser);
router.get('/login/:email/:password', /*auth.validateToken,*/ userController.login);
router.get('/login/social/:email/:type', /*auth.validateToken,*/ userController.socialLogin);

/* ------------------------- POST -------------------------- */
router.post("/create", /*auth.validateToken ,*/ userController.createUser);
router.post("/signup", /*auth.validateToken,*/ userController.createUser); // works for both: federated and not federated.

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", /*auth.validateToken ,*/ userController.updateUser);
router.put('/points/:id', /*auth.validateToken,*/ userController.updatePoints);
router.put('/addPoints/:id', /*auth.validateToken,*/ userController.addPoints);
router.put('/update/profile/image/:id', userController.updateUserProfileImage);
router.put('/update/preferred/language/:id', userController.updatePreferredLanguage);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", /*auth.validateToken ,*/ userController.deleteUser);

module.exports = router;
