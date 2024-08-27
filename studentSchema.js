const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department",
    },
});

module.exports = mongoose.model("Student", studentSchema);


