// External Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();
const LocalStrategy = require("passport-local");

// Local Modules
const studentRouter = require("./routes/studentRouter");
const facultyRouter = require("./routes/facultyRouter");
const adminRouter = require("./routes/adminRouter");
const loginRouter = require("./routes/login");
const Faculty = require("./models/faculty");
const { isAuthenticated } = require("./middleware/middleware");

const app = express();

// Trust proxy
app.set("trust proxy", 1);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["https://feedback-guru.onrender.com"], // frontend URLs
    credentials: true,
  })
);

// Session
const sessionOptions = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  },
};
app.use(session(sessionOptions));

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Faculty.authenticate()));
passport.serializeUser(Faculty.serializeUser());
passport.deserializeUser(Faculty.deserializeUser());

// DB
const DB_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
mongoose
  .connect(DB_URI, {})
  .then(() => console.log("Database Connected"))
  .catch((err) => console.error("DB Connection Error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Root is working");
});

app.get("/me", isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

app.use(loginRouter);
app.use(adminRouter);
app.use(studentRouter);
app.use(facultyRouter);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
