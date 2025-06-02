const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_PASSCODE,
  },
});

// Function to send email
exports.sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: "helloworld.personal.me@gmail.com",
    to,
    subject,
    text,
  };

  try {
    const emailResponse = await transporter.sendMail(mailOptions);
    console.log("Email successfully sent:", emailResponse);
    return emailResponse;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
