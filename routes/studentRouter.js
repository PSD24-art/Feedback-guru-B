const express = require("express");
const studentRouter = express.Router();
const studentController = require("../controller/studentController");

studentRouter.get("/feedback/:token", studentController.getFeedback);

studentRouter.post("/feedback/:token", studentController.postFeedback);

module.exports = studentRouter;
