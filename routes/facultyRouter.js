const express = require("express");
const facultyRouter = express.Router();
const facultyController = require("../controller/facultyController");

const { getFaculty, putSubject, postToken } = facultyController;

//Flow: faculty -> your subjects -> add subject -> generate Link (Link generated)

//fetches faculty and subject data of the faculty
facultyRouter.get("/faculties/:id", getFaculty);

//Add subject for feedback form and insert faculty id to it
facultyRouter.put("/faculties/:id/subject", putSubject);
//This module creates a unique link
facultyRouter.post("/faculties/:id/tokens", postToken);

module.exports = facultyRouter;
