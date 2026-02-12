const bcrypt = require("bcrypt");
const prisma = require("../utils/client");
const jwt = require("jsonwebtoken");
const { parse } = require("dotenv");

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: finalRole,
      },
    });

    res.status(201).json({
      message: "registration successful",
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "registration failed",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "email and password do not match",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(404).json({
        message: "email and password do not match",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.json({
      message: "login successful",
      token: token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "login failed",
      error: error.message,
    });
  }
};

const addMentorSubject = async (req, res) => {
  try {
    const { subjectId } = req.body;
    const mentorId = req.user.id;

    const mentorSubject = await prisma.mentorSubject.create({
      data: {
        mentorId: mentorId,
        subjectId: parseInt(subjectId),
      },
    });

    res.status(201).json({
      message: "Subject added to mentor successfully",
      data: mentorSubject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add subject to mentor",
      error: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  addMentorSubject,
};
