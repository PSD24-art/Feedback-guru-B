const Faculty = require("../models/faculty");
const Subject = require("../models/subject");
const FeedbackLink = require("../models/feedbackLink");
const Feedback = require("../models/feedback");

exports.getFaculties = async (req, res) => {
  try {
    const allFaculties = await Faculty.find({ role: "faculty" });
    //   console.log(allFaculties);
    res.json({ allFaculties });
  } catch (e) {
    res
      .status(404)
      .json({ message: "Failed to fetch faculties", error: e.message });
  }
};

exports.postFaculty = async (req, res) => {
  const { name, email, department } = req.body;
  let username = name.toLowerCase().split(" ").splice(0, 1) + "@tiet";
  const newFaculty = new Faculty({
    username,
    name,
    email,
    department,
    role: "faculty",
  });
  try {
    const result = await Faculty.register(newFaculty, "defaultPassword");
    res.json({ message: "Faculty added successfully", result });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

exports.getOneFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    let faculty = await Faculty.findById(id);
    //all subjects should be hardcoded in the databse
    const subject = await Subject.find({ faculty: faculty._id });
    if (!subject) {
      res.status(404).json({ error: "no subjects to fetch" });
    }
    if (!faculty) {
      res.status(404).json({ error: "no subjects to fetch" });
    }
    res.json({ faculty, subject });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
};

exports.deleteFaculty = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const deleteFaculty = await Faculty.findByIdAndDelete(id);
  console.log(deleteFaculty);
  res.json({ message: "Faculty Deleted Successfully", deleteFaculty });
};

//Controller for getting faculty links
exports.getFeedbackLinkAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const links = await FeedbackLink.find({ faculty: id }).populate(
      "subject",
      "name unique_code"
    );

    res.json({ links });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

//Controller for getting feedback docs and count
exports.getFeedbackCountAdmin = async (req, res) => {
  try {
    const { id, subject } = req.params;
    const result = await Feedback.find({ faculty: id, subject });

    if (result.length === 0) {
      return res.json({
        message: "No Data yet",
        Feedbacks: [],
        FeedbackLength: 0,
      });
    }

    console.log("Found feedbacks:", result.length);
    res.json({ Feedbacks: result, FeedbackLength: result.length });
  } catch (e) {
    console.error("Error in getFeedbackCount:", e);
    res.status(500).json({ error: e.message });
  }
};
