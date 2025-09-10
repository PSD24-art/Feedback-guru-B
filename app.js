//External Modules
const express = require("express");
const mongoose = require("mongoose");
const studentRouter = require("./routes/studentRouter");
const facultyRouter = require("./routes/facultyRouter");
const PORT = 3420;
const app = express();
main()
  .then(() => console.log("Databse Connected"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/feedbackSys");
}

//Flow faculty -> your subjects -> add subject -> generate Link (Link generated)

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send("Root is working");
});

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
