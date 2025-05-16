const express = require('express');
const router=express.Router();

const {login,signUp,verifyOTP,generateOTP,passwordUpdate, getProfileInfo,logout}=require("../controllers/student");
const {auth,isStudent}=require('../middlewires/auth');

router.post("/login",login);
router.post("/logout",logout);
router.post("/signUp",signUp);
router.post("/generateOTP",generateOTP);
router.post("/verifyOTP",verifyOTP);
router.post("/passwordUpdate",passwordUpdate);
router.get("/getProfileInfo",getProfileInfo);

//protected route sample
router.get('/student-dash',auth,isStudent,(req,res)=>{
  res.json({
    success:true,
    message:'Welcome to the protected route for students'
  });
});


module.exports = router;
