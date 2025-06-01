const mongoose = require("mongoose");

const academicDetailsSchema = new mongoose.Schema(
  {
    qualification: {
      type: String,
      required: true,
    },
    qualifying_institution: {
      type: String,
      required: true,
    },
  },
  { _id: false }
); // no separate _id for subdocuments

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_no: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "Prefer Not To Say"],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    about: {
      type: String,
    },
    // photo: {
    //   type: String // could be a URL or path to the image
    // },
    profession: {
      type: String,
    },
    institution: {
      type: String,
    },
    course_or_job_role: {
      type: String,
    },
    academic_details: {
      type: [academicDetailsSchema],
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // adds createdAt, updatedAt

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
