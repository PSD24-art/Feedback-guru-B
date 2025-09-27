const express = require("express");
const adminRouter = express.Router();
const adminController = require("../controller/adminController");
const { isAdmin } = require("../middleware/middleware");

//Flow: admin dashboard(see all faculties with thier names and subjects) -> clicks a faculty to deep dive into his analytics -> sidebar (has options to
// add a faculty, remove faculty)

const {
  getFaculties,
  postFaculty,
  getOneFaculty,
  deleteFaculty,
  getFeedbackLinkAdmin,
  getFeedbackCountAdmin,
} = adminController;

//get admin details
adminRouter.get("/admin/:id", isAdmin, getFaculties);
//get all faculties

//by clicking individual faculty admin redirects to link get-/faculty/:id

//get faculty
adminRouter.get("/admin/faculties/:id", isAdmin, getOneFaculty);
//Faculty Created Links
adminRouter.get("/admin/faculties/:id/links", isAdmin, getFeedbackLinkAdmin);
//Faculty feedback details
adminRouter.get(
  "/admin/faculties/:id/feedback/:subject",
  isAdmin,
  getFeedbackCountAdmin
);
//add faculty
adminRouter.post("/admin/faculties/new", isAdmin, postFaculty);

//delete faculty
adminRouter.delete("/admin/faculties/:id", isAdmin, deleteFaculty);

module.exports = adminRouter;
