const mongoose = require('mongoose');

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

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone_no: {
    type: Number,
    required: true,
    unique: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", "Prefer Not To Say"],
    required: true
  },
  about: {
    type: String
  },
  photo: {
    type: String // could be a URL or path to the image
  },
  profession: {
    type: String,
  },
  worksAt: {
    type: String
  },
  job_role: {
    type: String
  },
  academic_details: {
    type: [academicDetailsSchema],
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true }); // adds createdAt, updatedAt

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
