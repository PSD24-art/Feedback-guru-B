const Faculty = require("../models/faculty");
const Subject = require("../models/subject");
const Token = require("../models/token");
const { v4: uuidv4 } = require("uuid");
const PORT = 3420;

exports.getFaculty = async (req, res) => {
  const { id } = req.params;
  let faculty = await Faculty.findById(id);
  console.log(faculty);

  //all subjects should be hardcoded in the databse
  const subject = await Subject.find({ faculty: faculty._id });
  console.log(subject);
  if (!subject) {
    res.status(404).json({ error: "no subjects to fetch" });
  }
  if (!faculty) {
    res.status(404).json({ error: "no subjects to fetch" });
  }
  res.json({ subject, faculty });
};

exports.putSubject = async (req, res) => {
  const { id } = req.params;
  let faculty = await Faculty.findById(id);
  // console.log(faculty);
  const { code } = req.body;
  console.log(code);
  //all subjects should be hardcoded in the databse
  const subject = await Subject.findOne({ code: code });

  if (!faculty) {
    return res.status(404).json({ error: "Faculty not found" });
  }

  if (!subject) {
    return res.status(404).json({ error: "Subject not found" });
  }

  subject.faculty = faculty;
  await subject.save();
  res.json({ subject });
};

exports.postToken = async (req, res) => {
  const { code, faculty } = req.body;
  const token = uuidv4();
  let subject = await Subject.findOne({ code: code });
  console.log(subject);
  const newToken = new Token({
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
