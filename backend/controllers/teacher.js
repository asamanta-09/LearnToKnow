const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Teacher = require("../models/teacher");
const { sendMail } = require("./mail");

//signup
exports.signUp = async (req, res) => {
  try {
    //get data
    const {
      name,
      email,
      phone_no,
      gender,
      dob,
      about,
      profession,
      worksAt,
      job_role,
      academic_details,
      password,
    } = req.body;
    //check if the user already exists
    const existing_student = await Teacher.findOne({ email });
    if (existing_student) {
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
    await Teacher.create({
      name,
      email,
      phone_no,
      gender,
      dob,
      about,
      profession,
      worksAt,
      job_role,
      academic_details,
      password: hashPassword,
    });
    return res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Teacher cannot be registered, please try again later",
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
    let student = await Teacher.findOne({ email });
    //if not a registered user
    if (!student) {
      return res.status(401).json({
        success: false,
        message: "Teacher is not registered",
      });
    }

    const payload = {
      id: student._id,
      email: student.email,
      role: "teacher", //here we can add other things that student is subscribed or not etc.. and based on this authorization can be done at the middlewire section and add that middlewire to a particular route that checks for authorization to access it
    };

    //verify password and generate JWT token
    if (await bcrypt.compare(password, student.password)) {
      //password match
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      student = student.toObject();
      student.token = token;
      student.password = undefined; //remove password only from user object not the database
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "None",
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        student,
        message: "Teacher logged in successfully",
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

//generte OTP
const otpStore = new Map();
exports.generateOTP = async (req, res) => {
  try {
    console.log("hello")
    const { email, name } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    otpStore.set(email, { otp, otpExpiry });
    const subject = "Your Verification OTP";
    const text = `Hi ${name},\n\nYour OTP is: ${otp}\nExpires in 10 minutes.`;
    await sendMail(email, subject, text);
    return res
      .status(200)
      .json({ success: true, message: "OTP sent successfully to your email" });
  } catch (error) {
    console.error("Error generating OTP:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to send OTP" });
  }
};

//verify OTP
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const record = otpStore.get(email);
    if (!record) {
      return res
        .status(404)
        .json({ success: false, message: "No OTP found for this email" });
    }

    if (record.otp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (record.otpExpiry < new Date()) {
      otpStore.delete(email);
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }
    otpStore.delete(email);
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};

//password update -need to check
exports.passwordUpdate = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Teacher.findOne({ email });
    if (!student) {
      console.log("Teacher not found");
      return res.status(404).json({
        success: false,
        message: "Teacher not found",
      });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    student.password = hashedPassword;
    await student.save();
    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//getProfileInfo
exports.getProfileInfo = async (req, res) => {
  const { email } = req.query;
  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      console.log("Teacher not found for the email");
      return res.json({
        success: false,
        message: "Teacher not found",
      });
    }
    return res.status(200).json({
      success: true,
      teacher: teacher,
    });
  } catch (error) {
    console.error("Error fetching profile info:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//getTeacherInfoByEmail
exports.getTeacherInfoByEmail = async (req, res) => {
  try {
    const { email } = req.query; // get email from query param now
    if (!email) {
      return res
        .status(400)
        .json({ message: "Email query parameter is required" });
    }
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error("Error fetching teacher by email:", error);
    res.status(500).json({ message: "Server error" });
  }
};
