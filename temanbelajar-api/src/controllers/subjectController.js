const prisma = require("../utils/client");

const createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const newSubject = await prisma.subject.create({
      data: { name },
    });
    res.status(201).json({
      message: "Subject created successfully",
      data: newSubject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create subject",
      error: error.message,
    });
  }
};

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subject.findMany();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve subjects",
      error: error.message,
    });
  }
};

module.exports = {
  createSubject,
  getAllSubjects,
};
