//External Modules
const express = require("express");
const mongoose = require("mongoose");
const studentRouter = require("./routes/studentRouter");
const facultyRouter = require("./routes/facultyRouter");
const adminRouter = require("./routes/adminRouter");
const app = express();
require("dotenv").config();
const dbURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
main()
  .then(() => console.log("Databse Connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(dbURI);
}

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// "/" route
app.get("/", (req, res) => {
  res.send("Root is working");
});
//routes for admin
app.use(adminRouter);
// routes for students
app.use(studentRouter);
//routes for "/faculties"
app.use(facultyRouter);
//Error Route
app.use((req, res) => {
  res.send("Bad request");
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
