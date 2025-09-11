const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController");
const Faculty = require("../models/faculty");
const Subject = require("../models/subject");
//Flow: admin dashboard(see all faculties with thier names and subjects) -> clicks a faculty to deep dive into his analytics -> sidebar (has options to add a faculty, remove faculty)

const { getFaculties, postFaculty, getOneFaculty, deleteFaculty } =
  adminController;
//get all faculties
adminRouter.get("/admin", getFaculties);

//by clicking individual faculty admin redirects to link get-/faculty/:id

//get faculty
adminRouter.get("/admin/faculties/:id", getOneFaculty);

//add faculty
adminRouter.post("/admin/faculty/new", postFaculty);
module.exports = adminRouter;

//delete faculty
adminRouter.delete("/admin/faculties/:id", deleteFaculty);
