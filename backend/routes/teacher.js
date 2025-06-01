const express = require('express');
const router=express.Router();

const {login,logout,signUp,generateOTP,verifyOTP,passwordUpdate,getProfileInfo,getTeacherInfoByEmail}=require("../controllers/teacher");
const {auth,isTeacher}=require('../middlewires/auth');

router.post("/login",login);
router.post("/logout",auth,logout);
router.post("/signUp",signUp);
router.post("/generateOTP",generateOTP);
router.post("/verifyOTP",verifyOTP);
router.patch("/passwordUpdate",passwordUpdate);
router.get("/getProfileInfo",auth, isTeacher,getProfileInfo);
router.get("/getTeacherDetails",auth, getTeacherInfoByEmail);

module.exports = router;
