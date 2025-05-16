const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
require("./config/database").connect(); //connect with database

const student = require("./routes/student");
app.use("/student", student);

const teacher = require("./routes/teacher");
app.use("/teacher", teacher);

const admin = require("./routes/admin");
app.use("/admin", admin);

const course = require("./routes/course.js");
app.use("/course", course);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server connected at http://localhost:${PORT}`);
});
