import Student from "../models/Student.js";

// Add a new student
export const addStudent = async (req, res) => {
  try {
    const { name, email, phone, course, age } = req.body;

    const student = await Student.create({
      name,
      email,
      phone,
      course,
      age,
    });

    res.status(201).json({
      success: true,
      message: "Student added successfully",
      data: student,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to add student",
    });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
};


// Update an existing student
export const updateStudent = async (req, res) => {
  try {
    const { name, email, phone, course, age } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, course, age },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update student",
    });
  }
};

// Delete a student
export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid student ID",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete student",
    });
  }
};

// Search students by name or email
export const searchStudents = async (req, res) => {
  try {
    const search = req.query.search?.trim();

    // If no search term is provided, return all students
    if (!search) {
      const students = await Student.find().sort({
        createdAt: -1,
      });

      return res.status(200).json({
        success: true,
        count: students.length,
        data: students,
      });
    }

    // Escape special regex characters
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const students = await Student.find({
      $or: [
        { name: { $regex: escapedSearch, $options: "i" } },
        { email: { $regex: escapedSearch, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to search students",
    });
  }
};
