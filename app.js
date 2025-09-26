//External Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const LocalStrategy = require("passport-local");
//Local Modules
const studentRouter = require("./routes/studentRouter");
const facultyRouter = require("./routes/facultyRouter");
const adminRouter = require("./routes/adminRouter");
const loginRouter = require("./routes/login");
const Faculty = require("./models/faculty");
const { isAuthenticated } = require("./middleware/middleware");
const app = express();
//

app.use(
  cors({
    origin: "https://feedback-guru.onrender.com",
    credentials: true,
  })
);


const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
  autoRemove: "native",
});

mongoStore.on("error", (err) => {
  console.error("Mongo session store error:", err);
});

const sessionOptions = {
  name: "feedbackGuruSession",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: mongoStore, // reference the variable here
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  },
};
app.use(session(sessionOptions));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Passport middlewraes
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Faculty.authenticate()));
passport.serializeUser(Faculty.serializeUser());
passport.deserializeUser(Faculty.deserializeUser());
//

const DB_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(DB_URI, {})
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("DB Connection Error:", err));



//
//req.user
// app.use((req, res, next) => {
//   res.locals.cruuUserId = req.user._id.toString();
//   next();
// });
// "/" route
app.get("/", (req, res) => {
  res.send("Root is working");
});

app.get("/me", isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

//login Route
app.use(loginRouter);
//routes for admin
app.use(adminRouter);
// routes for students
app.use(studentRouter);
//routes for "/faculties"
app.use(facultyRouter);
//Error Route
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
