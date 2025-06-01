const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
require("dotenv").config();

//login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields carefully",
      });
    }

    let admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin is not registered",
      });
    }

    const payload = {
      id: admin._id,
      email: admin.email,
      role: "admin",
    };

    // Compare password
    if (password === admin.password) {
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      admin = admin.toObject();
      admin.token = token;
      admin.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), //cookie valid for 3 days once created
        httpOnly: true,
      };
      return res
        .cookie("token", token, options)
        .status(200)
        .json({
          success: true,
          message: "Admin logged in successfully",
          token,
        });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Login failure" });
  }
};

// logout
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during logout",
    });
  }
};
