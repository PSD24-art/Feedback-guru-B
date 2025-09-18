const Faculty = require("../models/faculty");
const Subject = require("../models/subject");

exports.getFaculties = async (req, res) => {
  const allFaculties = await Faculty.find({ role: "faculty" });
  //   console.log(allFaculties);
  res.json({ allFaculties });
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
    res.json({ result, message: "Faculty added successfully" });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
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
  res.json({ faculty, subject });
};

exports.deleteFaculty = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const deleteFaculty = await Faculty.findByIdAndDelete(id);
  console.log(deleteFaculty);
  res.json({ deleteFaculty });
};
