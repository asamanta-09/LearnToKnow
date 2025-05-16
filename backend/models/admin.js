const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdBy:{
    type:String
  }
}, { timestamps: true }); // adds createdAt, updatedAt

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
