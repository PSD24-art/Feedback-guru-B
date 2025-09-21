const express = require("express");
const facultyRouter = express.Router();
const facultyController = require("../controller/facultyController");
const { isAuthenticated } = require("../middleware/middleware");

const { getFaculty, putSubject, postToken, getSubject, postSubject } =
  facultyController;

//Flow: faculty -> your subjects -> add subject -> generate Link (Link generated)

//fetches faculty and subject data of the faculty
facultyRouter.get("/faculties/:id", isAuthenticated, getFaculty);
//Get all subjects
facultyRouter.get("/faculties/:id/subject", isAuthenticated, getSubject);
//Add new subject in DB
facultyRouter.post("/faculties/:id/subject", isAuthenticated, postSubject);
//Add subject for feedback form and insert faculty id to it
facultyRouter.put("/faculties/:id/subject", isAuthenticated, putSubject);
//This module creates a unique link
facultyRouter.post("/faculties/:id/tokens", postToken);

module.exports = facultyRouter;
