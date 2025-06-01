const mongoose=require('mongoose');
require('dotenv').config();

exports.connect=()=>{
  mongoose.connect(process.env.MONGODB_URI)
  .then(()=>{console.log("Database connected successfully")})
  .catch((err)=>{
    console.log("Database connection issue ");
    console.error(err);
    process.exit(1);
  })
};