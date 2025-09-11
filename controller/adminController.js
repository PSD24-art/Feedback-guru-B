const Faculty = require("../models/faculty");
const Subject = require("../models/subject");
const Token = require("../models/token");
const { v4: uuidv4 } = require("uuid");
const PORT = 3420;

exports.getFaculties = async (req, res) => {
  const allFaculties = await Faculty.find();
  //   console.log(allFaculties);
  res.json({ allFaculties });
};

exports.postFaculty = async (req, res) => {
  const { name, email, department } = req.body;

  const newFaculty = new Faculty({
    name,
    email,
    department,
    role: "faculty",
  });

  const result = await newFaculty.save();
  res.json({ result });
};

exports.getOneFaculty = async (req, res) => {
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
  res.json({ subject });
};

exports.deleteFaculty = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const deletFaculty = await Faculty.findByIdAndDelete(id);
  console.log(deletFaculty);
  res.json({ deletFaculty });
};
