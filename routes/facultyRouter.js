const express = require("express");
const facultyRouter = express.Router();
const facultyController = require("../controller/facultyController");
const { isAuthenticated } = require("../middleware/middleware");

const { getFaculty, putSubject, postToken } = facultyController;

//Flow: faculty -> your subjects -> add subject -> generate Link (Link generated)

//fetches faculty and subject data of the faculty
facultyRouter.get("/faculties/:id", isAuthenticated, getFaculty);

//Add subject for feedback form and insert faculty id to it
facultyRouter.put("/faculties/:id/subject", isAuthenticated, putSubject);
//This module creates a unique link
facultyRouter.post("/faculties/:id/tokens", isAuthenticated, postToken);

module.exports = facultyRouter;
