const express = require("express");
const router = express.Router();
const {
  createSubject,
  getAllSubjects,
} = require("../controllers/subjectController");
const verifyToken = require("../middlewares/authMiddleware");
const { get } = require("./authRoutes");

router.get("/", getAllSubjects);
router.post("/", verifyToken, createSubject);

module.exports = router;
