const express = require('express');
const router=express.Router();

const {login}=require("../controllers/admin");
const {auth,isAdmin}=require('../middlewires/auth');

router.post("/login",login);


module.exports = router;
