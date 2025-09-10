const express = require("express");
const studentRouter = express.Router();
const studentController = require("../controller/studentController");
studentRouter.post("/feedback/:token", studentController.postFeedback);

studentRouter.get("/feedback/:token", studentController.getFeedback);

module.exports = studentRouter;
