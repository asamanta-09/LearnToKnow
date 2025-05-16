const express = require('express');
const router=express.Router();

const {login,logout,signUp,generateOTP,verifyOTP,passwordUpdate,getProfileInfo,getTeacherInfo}=require("../controllers/teacher");
const {auth,isTeacher}=require('../middlewires/auth');

router.post("/login",login);
router.post("/logout",logout);
router.post("/signUp",signUp);
router.post("/generateOTP",generateOTP);
router.post("/verifyOTP",verifyOTP);
router.post("/passwordUpdate",passwordUpdate);
router.get("/getProfileInfo",getProfileInfo);
router.get("/getTeacherInfo",getTeacherInfo);

//protected route sample
router.get('/teacher-dash',auth,isTeacher,(req,res)=>{
  res.json({
    success:true,
    message:'Welcome to the protected route for teachers'
  });
});


module.exports = router;
