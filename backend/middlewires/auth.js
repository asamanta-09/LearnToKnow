//auth , isStudent,isAdmin

const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=(req,res,next)=>{
  try{
    //extract jwt token
    const authHeader = req.header("Authorization");
    const token = req.body?.token || req.cookies?.token || (authHeader && authHeader.replace("Bearer ", ""));

    if(!token){
      return res.status(401).json({
        success:false,
        message:"token missing"
      });
    }

    try{
      const payload=jwt.verify(token,process.env.JWT_SECRET);
      req.user=payload;
    }catch(err){
      return res.status(401).json({
        success:false,
        message:"token is invalid"
      });
    }
    next();
  }catch(err){
    console.error("Outer Catch Error:", err);
    return res.status(401).json({
      success:false,
      message:"something went wrong while verifying the token"
    });
  }
}

exports.isStudent=(req,res,next)=>{
  try{
    if(req.user.role!=="student"){
      return res.status(403).json({
        success:false,
        message:"this is a protected route for students and you are not allowed"
      });
    }
    next();
  }catch(err){
    return res.status(500).json({
      success:false,
      message:"user role is not matching"
    })
  }
}

exports.isTeacher=(req,res,next)=>{
  try{
    if(req.user.role!=="teacher"){
      return res.status(403).json({
        success:false,
        message:"this is a protected route for teachers and you are not allowed"
      });
    }
    next();
  }catch(err){
    return res.status(500).json({
      success:false,
      message:"user role is not matching"
    })
  }
}


exports.isAdmin=(req,res,next)=>{
  try{
    if(req.user.role!=="admin"){
      return res.status(403).json({
        success:false,
        message:"this is a protected route for admin and you are not allowed"
      });
    }
    next();
  }catch(err){
    return res.status(500).json({
      success:false,
      message:"user role is not matching"
    })
  }
}

exports.isSuperAdmin=(req,res,next)=>{
  try{
    if(req.user.role!=="superadmin"){
      return res.status(403).json({
        success:false,
        message:"this is a protected route for superadmin and you are not allowed"
      });
    }
    next();
  }catch(err){
    return res.status(500).json({
      success:false,
      message:"user role is not matching"
    })
  }
}