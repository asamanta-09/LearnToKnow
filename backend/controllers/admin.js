const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Admin = require("../models/admin");
const SuperAdmin=require('../models/superadmin');

//signup route handle
exports.addAdmin = async (req, res) => {
  try {
    //get data
    const { name, email, password } = req.body;
    //check if the user already exists
    const existing_admin = await Admin.findOne({ email });
    if (existing_admin) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    //secure password
    let hashPassword;
    try {
      hashPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.json({
        success: false,
        message: "Error in password hashing",
      });
    }

    //create the user
    const admin = await Admin.create({
      name,
      email,
      password: hashPassword,
      createdBy:req.user.email
    });
    return res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Admin cannot be registered, please try again later",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;
    //validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields carefully",
      });
    }
    //check for the registered user
    let admin = await Admin.findOne({ email });
    //if not a registered user
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin is not registered",
      });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      role: "admin", //here we can add other things that admin is subscribed or not etc.. and based on this authorization can be done at the middlewire section and add that middlewire to a particular route that checks for authorization to access it
    };

    //verify password and generate JWT token
    if (await bcrypt.compare(password, admin.password)) {
      //password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      admin = admin.toObject();
      admin.token = token;
      admin.password = undefined; //remove password only from user object not the database
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //cookie valid for 3 days once created
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        admin,
        message: "admin logged in successfully",
      });
    } else {
      //password do not match
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};




//superadmin login
exports.superadminlogin = async (req, res) => {
  try {
    //data fetch
    const { email, password } = req.body;
    //validation on email and password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields carefully",
      });
    }
    //check for the registered user
    let superadmin = await SuperAdmin.findOne({ email });
    //if not a registered user
    if (!superadmin) {
      return res.status(403).json({
        success: false,
        message: "Super Admin is not registered",
      });
    }

    const payload = {
      id: superadmin._id,
      email: superadmin.email,
      role: "superadmin",
    };

    //verify password and generate JWT token
    if (password===superadmin.password) {
      //password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      superadmin = superadmin.toObject();
      superadmin.token = token;
      superadmin.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //cookie valid for 3 days once created
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        superadmin,
        message: "superadmin logged in successfully",
      });
    } else {
      //password do not match
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};
