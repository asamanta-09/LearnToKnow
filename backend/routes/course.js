const express = require('express');
const router=express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {getOnlineCourses,getOfflineCourses,getOnlineCoursesByTeacher,getOfflineCoursesByTeacher,createCourse,getEnrollmentsByTopic}=require("../controllers/course.js");
const {auth,isStudent,isTeacher}=require('../middlewires/auth');



router.post("/createCourse",auth,isTeacher, upload.single('thumbnail'), createCourse);
router.get("/getOnlineCourses",auth,getOnlineCourses);
router.get("/getOfflineCourses",auth,getOfflineCourses);
router.post("/getOnlineCoursesByTeacher",auth,getOnlineCoursesByTeacher);
router.post("/getOfflineCoursesByTeacher",auth,getOfflineCoursesByTeacher);
router.get("/:email/course-enrollments-by-topic", auth,getEnrollmentsByTopic);


module.exports = router;
