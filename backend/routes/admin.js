const express = require('express');
const router=express.Router();

const {login,addAdmin,superadminlogin}=require("../controllers/admin");
const {auth,isSuperAdmin,isAdmin}=require('../middlewires/auth');

router.post("/login",login);
router.post("/addAdmin",auth,isSuperAdmin,addAdmin);
router.post("/superadminlogin",superadminlogin)

//protected route sample
router.get('/admin-dash',auth,isAdmin,(req,res)=>{
  res.json({
    success:true,
    message:'Welcome to the protected route for admin'
  });
});


router.get('/super-admin-dash',auth,isSuperAdmin,(req,res)=>{
  res.json({
    success:true,
    message:'Welcome to the protected route for superadmin'
  });
});


module.exports = router;
