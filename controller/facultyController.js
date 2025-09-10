const Faculty = require("../models/faculty");
const Subject = require("../models/subject");
const Token = require("../models/token");
const { v4: uuidv4 } = require("uuid");

exports.putSubject = async (req, res) => {
  const { id } = req.params;
  let faculty = await Faculty.findById(id);
  // console.log(faculty);
  const { code } = req.body;
  console.log(code);
  //all subjects should be hardcoded in the databse
  const subject = await Subject.findOne({ code: code });
  if (faculty) {
    subject.faculty = faculty;
  } else {
    console.log("faculty not found");
  }
  res.json({ subject });
};

exports.getFaculty = async (req, res) => {
  const { id } = req.params;
  let faculty = await Faculty.findById(id);
  // console.log(faculty);
  const { code } = req.body;
  console.log(code);
  //all subjects should be hardcoded in the databse
  const subject = await Subject.findOne({ code: code });
  if (faculty) {
    subject.faculty = faculty;
  } else {
    console.log("faculty not found");
  }
  res.json({ subject });
};

exports.facultyDashboard = (req, res) => {
  res.send("Dashboard is working");
};

exports.postToken = async (req, res) => {
  const { code, faculty } = req.body;
  const token = uuidv4();
  let subject = await Subject.findOne({ code: code });
  console.log(subject);
  const newToken = await new Token({
    token: token,
    faculty: faculty,
    subject: subject,
  });

  await newToken.save();
  console.log(newToken);
  res.json({
    link: `http://localhost:${PORT}/feedback/${token}`, //React new Link
  });
};
