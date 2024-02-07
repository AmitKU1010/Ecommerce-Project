const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const authMiddleware = asyncHandler(async(req,res,next)=>{
    let token;
if(req?.headers?.authorization?.startsWith("Bearer")){
    token = req.headers.authorization.split(" ")[1];
    try{
    if(token){
        const decode = jwt.decode(token,process.env.JWT_SECRET);
        const user = await User.findById(decode?.id);
        req.user = user;
        console.log( req.user)
        next();
    }
    }catch(error){
    throw new Error(error);
    }
}
});

const isAdmin = asyncHandler(async(req,res,next)=>{
    const {email} = req.user;
    console.log(email);
    const findUserRole = await User.findOne({ email:email });
    console.log(findUserRole)
    if(findUserRole.role != 'admin'){
     throw new Error("You are not a admin")
    }else{
        next();
    }
})

module.exports = {authMiddleware,isAdmin};

