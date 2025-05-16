const mongoose = require('mongoose');

const superadminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}); 
const SuperAdmin = mongoose.model('SuperAdmin', superadminSchema);
module.exports = SuperAdmin;