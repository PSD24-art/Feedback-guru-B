const Faculty = require("../models/faculty");
const Subject = require("../models/subject");
const Token = require("../models/token");
const { v4: uuidv4 } = require("uuid");
const PORT = 3420;

exports.getFaculty = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() === id) {
    let faculty = await Faculty.findById(id);
    // console.log(faculty);

    //all subjects should be hardcoded in the databse
    const subject = await Subject.find({ faculty: faculty._id });
    // console.log(subject);

    if (!subject) {
      return res.status(404).json({ error: "no subjects to fetch" });
    }
    if (!faculty) {
      return res.status(404).json({ error: "no subjects to fetch" });
    }
    console.log("Faculty: ", faculty, " Subject: ", subject);

    res.json({ faculty });
  }
};

exports.getSubject = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user._id.toString() !== id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const subject = await Subject.find();
    res.json({ subject });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.putSubject = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() === id) {
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
    const result = await subject.save();
    console.log("Put subject", result);

    res.json({ subjectWithFaculty: subject });
  }
};

exports.postSubject = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() === id) {
    let faculty = await Faculty.findById(id);
    // console.log(faculty);
    const { name, code, department, semester } = req.body;

    //all subjects should be hardcoded in the databse
    const newSubject = new Subject({
      name,
      code,
      department,
      semester,
    });

    const subject = await newSubject.save();

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    if (!subject) {
      return res.status(404).json({ error: "Subject not saved" });
    }

    subject.created_by = faculty;
    const result = await subject.save();
    console.log("New Subject", result);
    res.json({ message: "Subject saved", subject, created_by: faculty });
  }
};

exports.postToken = async (req, res) => {
  const { id } = req.params;
  if (req.user._id.toString() === id) {
    const { code } = req.body;
    const token = uuidv4();
    let subject = await Subject.findOne({ code: code });
    console.log(subject);
    const newToken = new Token({
      token: token,
      faculty: id,
      subject: subject,
    });

    await newToken.save();
    console.log(newToken);
    res.json({
      link: `http://localhost:${PORT}/feedback/${token}`, //React new Link
      newToken,
    });
  }
};
