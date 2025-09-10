const express = require("express");
const facultyRouter = express.Router();
const facultyController = require("../controller/facultyController");

facultyRouter.get("/faculties/:id", facultyController.getFaculty);

facultyRouter.put("/faculties/:id/subject", facultyController.putSubject);

facultyRouter.get("/faculties", facultyController.facultyDashboard);

facultyRouter.post("/tokens", facultyController.postToken);

module.exports = facultyRouter;
