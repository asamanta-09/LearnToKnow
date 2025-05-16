const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(bodyParser.json()); // Parse JSON request body


app.get("/student-home-online-course", (req, res) => {
  const online_courses = [
    {
      id: 1,
      name: "Cloud Computing",
      image: "/cloud-aws.webp",
    },
    {
      id: 2,
      name: "React Js",
      image: "/react.webp",
    },
    {
      id: 3,
      name: "Gate Preparation",
      image: "/gate.webp",
    },
    {
      id: 4,
      name: "Data Structure",
      image: "/dsa.webp",
    },
    {
      id: 5,
      name: "Machine Learning",
      image: "/ml-ds-image.webp",
    },
    {
      id: 6,
      name: "Java Programming",
      image: "/java.webp",
    },
  ];
  res.send(online_courses);
});
app.get("/student-home-offline-course", (req, res) => {
  const offline_courses = [
    {
      id: 1,
      name: "Generative AI",
      image: "/generative-ai.webp",
    },
    {
      id: 2,
      name: "C Programming",
      image: "/c-program.webp",
    },
    {
      id: 3,
      name: "Interview Preparation",
      image: "/interview.webp",
    },
    {
      id: 4,
      name: "IOS Developement",
      image: "/ios-developement.webp",
    },
    {
      id: 5,
      name: "Mongo DB",
      image: "/mongo-db.webp",
    },
    {
      id: 6,
      name: "Software Testing",
      image: "/software-testing.webp",
    },
  ];
  res.send(offline_courses);
});

app.get("/student-home-notes", (req, res) => {
  const notes = [
    {
      id: 1,
      name: "JAVA",
      image: "Java Programming",
    },
    {
      id: 2,
      name: "DSA",
      image: "DSA",
    },
    {
      id: 3,
      name: "Software Engineering",
      image: "Software Engineering",
    },
    {
      id: 4,
      name: "Image Processing",
      image: "Image Processing",
    },
    {
      id: 5,
      name: "Python",
      image: "Python Programming",
    },
    {
      id: 6,
      name: "Computer Architecture",
      image: "Computer Architecture",
    },
  ];
  res.send(notes);
});

app.post("/course-lists", (req, res) => {
  const course = [
    {
      id: 1,
      name: "JAVA",
    },
    {
      id: 2,
      name: "Computer Architecture",
    },
  ];
  console.log("Course clicked:", req.body.courseName);
  res.json(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server start at http://localhost:${port}`);
});
