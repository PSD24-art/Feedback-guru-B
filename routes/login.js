const express = require("express");
const passport = require("passport");
const { isAuthenticated } = require("../middleware/middleware");
const router = express.Router();

router.post("/login", passport.authenticate("local"), async (req, res) => {
  res.json({
    message: "Login successful",
    user: {
      id: req.user._id,
      role: req.user.role,
      username: req.user.username,
    },
  });
});

//change password
router.post("/change-password", isAuthenticated, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    await req.user.changePassword(oldPassword, newPassword);
    await req.user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res
      .status(400)
      .json({ message: "Error changing password", error: err.message });
  }
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
});

module.exports = router;
