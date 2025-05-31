const express = require('express');
const router=express.Router();

const {login,signUp,verifyOTP,generateOTP,passwordUpdate, getProfileInfo,logout}=require("../controllers/student");
const {auth,isStudent}=require('../middlewires/auth');

router.post("/login",login);
router.post("/logout",auth,logout);
router.post("/signUp",signUp);
router.post("/generateOTP",generateOTP);
router.post("/verifyOTP",verifyOTP);
router.post("/passwordUpdate",auth,isStudent,passwordUpdate);
router.get("/getProfileInfo",auth,isStudent,getProfileInfo);

module.exports = router;
