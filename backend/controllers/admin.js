const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Admin = require("../models/admin");

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

      // Send token in response header
      return res
        .status(200)
        .set("Authorization", `Bearer ${token}`)
        .json({ success: true, message: "Admin logged in successfully" });
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


