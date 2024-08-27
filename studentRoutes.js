const express = require("express");
const router = express.Router();
const Student = require("../../db/schemas/studentSchema");


router.get("/", async (req, res) => {
    try {
        const filter = req.query.name ? { name: { $regex: req.query.name, $options: "i" } } : {};
        const students = await Student.find(filter).populate("department");
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


router.post("/", async (req, res) => {
    try {
        console.log(req.body); 
        const studentData = req.body;

        const existingStudent = await Student.findOne({ registrationNumber: studentData.registrationNumber });
        if (existingStudent) {
            return res.status(400).json({ message: "Registration number must be unique." });
        }

        const newStudent = new Student(studentData);
        await newStudent.save();
        res.status(201).json({ message: "Student added successfully", student: newStudent });
    } catch (error) {
        console.error("Error adding student:", error); 
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/department/:departmentId", async (req, res) => {
    try {
        const students = await Student.find({ department: req.params.departmentId }).populate("department");
        if (!students.length) {
            return res.status(404).json({ message: "No students found in this department." });
        }
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;