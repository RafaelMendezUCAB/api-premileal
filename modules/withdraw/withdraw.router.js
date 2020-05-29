const express = require("express");
const router = express.Router();
const withdrawController = require("./withdraw.controller");
const auth = require("../../middlewares/auth");

/* --------------------------- GET ------------------------- */
router.get("/all", withdrawController.getAllWithdraws);
router.get("/:id", withdrawController.getWithdraw);

/* ------------------------- POST -------------------------- */
router.post("/create", withdrawController.createWithdraw);

/* -------------------------- PUT ---------------------------- */
router.put("/update/:id", withdrawController.updateWithdraw);

/* ------------------------- DELETE -------------------------- */
router.delete("/delete/:id", withdrawController.deleteWithdraw);

module.exports = router;
