const express = require('express');
const router=express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {getOnlineCourses,getOfflineCourses,getNotes,getOnlineCoursesByTeacher,getOfflineCoursesByTeacher,createCourse,getEnrollmentsByTopic}=require("../controllers/course.js");
const {auth,isStudent}=require('../middlewires/auth');



router.post("/createCourse", upload.single('thumbnail'), createCourse);
router.get("/getOnlineCourses",getOnlineCourses);
router.get("/getOfflineCourses",getOfflineCourses);
router.get("/getNotes",getNotes);
router.post("/getOnlineCoursesByTeacher",getOnlineCoursesByTeacher);
router.post("/getOfflineCoursesByTeacher",getOfflineCoursesByTeacher);
router.get("/:email/course-enrollments-by-topic", getEnrollmentsByTopic);


//protected route sample
router.get('/student-dash',auth,isStudent,(req,res)=>{
  res.json({
    success:true,
    message:'Welcome to the protected route for students'
  });
});


module.exports = router;
