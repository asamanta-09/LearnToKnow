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
app.use(express.json()); // for parsing json
app.use(express.urlencoded({ extended: true })); // for parsing form
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

const notes = require("./routes/notes.js");
app.use("/notes", notes);

const playlist = require("./routes/playlist.js");
app.use("/playlist", playlist);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server connected at http://localhost:${PORT}`);
});
