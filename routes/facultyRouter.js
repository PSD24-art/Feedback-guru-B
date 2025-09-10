const express = require("express");
const facultyRouter = express.Router();
const facultyController = require("../controller/facultyController");
facultyRouter.put("/faculties/:id/subject", facultyController.putSubject);

facultyRouter.get("/faculties/:id", facultyController.getFaculty);

facultyRouter.get("/faculties", facultyController.facultyDashboard);

app.post("/tokens", facultyController.postToken);
