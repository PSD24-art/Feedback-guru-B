const mongoose = require("mongoose");
const { Schema } = require("mongoose");
// main()
//   .then(() => console.log("Databse Connected"))
//   .catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/feedbackSys");
// }

const facultySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: String,
  department: String,
  role: { type: String, required: true },
});

const Faculty = mongoose.model("Faculty", facultySchema);

const addFaculty = async () => {
  // await Faculty.deleteMany({});
  // let newFaculty = new Faculty({
  //   name: "D. T. Ingole",
  //   email: "djmanowar@tietdarapur.ac.in",
  //   password: "DTINGOLE",
  //   department: "Computer Science",
  //   role: "admin",
  // });
  // let res = await newFaculty.save();

  let res = await Faculty.insertMany([
    {
      name: "D. J. Manowar",
      email: "djmanowar@tietdarapur.ac.in",
      password: "DJMANOWAR",
      department: "Computer Science",
      role: "faculty",
    },
    {
      name: "T. N. Ghorsad",
      email: "tnghorsad@tietdarapur.ac.in",
      password: "TNGHORSAD",
      department: "Computer Science",
      role: "faculty",
    },
  ]);
  console.log(res);
};

// addFaculty();
module.exports = Faculty;
