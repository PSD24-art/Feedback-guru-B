const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// main()
//   .then(() => console.log("Databse Connected"))
//   .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/feedbackSys");
}

const studentSchema = new Schema({
  rollNo: { type: String, required: true },
  name: { type: String, required: true },
  yearOfStudy: String,
  department: String,
});

const Student = mongoose.model("Student", studentSchema);

const addStudent = async () => {
  let std1 = new Student({
    rollNo: "23BD310559",
    name: "Yash Mahulkar",
    yearOfStudy: "Final Year",
    department: "Computer Science",
  });

  let res = await std1.save();
  console.log(res);
};

// addStudent();
module.exports = Student;
