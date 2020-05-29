const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.get('/login/:email/:password', userController.login);
router.get('/login/social/:email/:type', userController.socialLogin);
router.get('/login/admin/:email/:password', userController.adminLogin);

/* ------------------------- POST -------------------------- */
router.post("/create", userController.createUser);
router.post("/signup", userController.createUser); // works for both: federated and not federated.

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", userController.updateUser);
router.put('/points/:id', userController.updatePoints);
router.put('/addPoints/:id', userController.addPoints);
router.put('/update/profile/image/:id', userController.updateUserProfileImage);
router.put('/update/preferred/language/:id', userController.updatePreferredLanguage);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", userController.deleteUser);

module.exports = router;
