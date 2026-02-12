const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");

const {
  register,
  login,
  addMentorSubject,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/add-subject", verifyToken, addMentorSubject);

module.exports = router;
