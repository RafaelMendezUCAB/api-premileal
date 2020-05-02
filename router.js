const express = require("express");
const router = express.Router();

// Modules
const userRouter = require("./modules/user/user.router");

// Routes
router.use("/user", userRouter);

module.exports = router;
