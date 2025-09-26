const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// const DB_URI =
//   "mongodb+srv://prathameshd025:Psdahake25s2@prathameshd.sxigv0g.mongodb.net/feedbackSys";

// console.log("Mongo URI:", DB_URI); // should print the URI
// mongoose
//   .connect(DB_URI)
//   .then(() => console.log("Database Connected"))
//   .catch((err) => console.error("DB Connection Error:", err));

const facultySchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  department: String,
  role: { type: String, required: true },
  isPasswordSet: { type: Boolean, default: false },
});
facultySchema.plugin(passportLocalMongoose);
const Faculty = mongoose.model("Faculty", facultySchema);

module.exports = Faculty;

// const addFaculty = async () => {
//   // await Faculty.deleteMany({});
//   // let newFaculty = new Faculty({
//   //   username: "dtingole",
//   //   name: "D. T. Ingole",
//   //   email: "djmanowar@tietdarapur.ac.in",
//   //   password: "DTINGOLE",
//   //   department: "Computer Science",
//   //   role: "admin",
//   // });
//   // let res = await newFaculty.save();
//   // let admin = await Faculty.findByIdAndUpdate("68bfcbaec6cf4d7bfd577df7");
//   // admin.username = "dtingole";
//   // let res = await admin.save();
//   // console.log("Result", res);
//   // let res = await Faculty.insertMany([
//   //   {
//   //     name: "D. J. Manowar",
//   //     email: "djmanowar@tietdarapur.ac.in",
//   //     password: "DJMANOWAR",
//   //     department: "Computer Science",
//   //     role: "faculty",
//   //   },
//   //   {
//   //     name: "T. N. Ghorsad",
//   //     email: "tnghorsad@tietdarapur.ac.in",
//   //     password: "TNGHORSAD",
//   //     department: "Computer Science",
//   //     role: "faculty",
//   //   },
//   // ]);
//   // console.log(res);
// };
// addFaculty();

// const seedAdmin = async () => {
//   const admin = new Faculty({
//     name: "Prathamesh Dahake",
//     username: "pratham@tiet",
//     email: "pratham@tietdarapu.in",
//     role: "admin",
//     isPasswordSet: false,
//   });

//   const newAdmin = await Faculty.register(admin, "defaultPassword");

//   console.log(newAdmin);
// };
// seedAdmin();
