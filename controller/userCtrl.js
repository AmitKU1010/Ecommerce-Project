const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../config/jwtToken');
const validateMongoDbid = require('../utils/validateMongodbId');
const { generateRefreshToken } = require('../config/refreshToken');
const jwt = require('jsonwebtoken');



const createUser = asyncHandler(async (req,res) =>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email});
    if(!findUser){
        const newUser = User.create(req.body);
        res.json({
            user: email,
            msg:"User created successfully",
            success:true
        })
    }else{
     throw new Error('User already exist')
    }
});

const loginUserCtrl = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    console.log(email,password);
    const findUser = await User.findOne({email});
    if(findUser && (await findUser.isPasswordMatched(password))){
        const refreshToken = await generateRefreshToken(findUser?._id);
        const updateUser = await User.findByIdAndUpdate(findUser?._id,{
            refreshToken:refreshToken
        },
        {
            new: true
        }
        );
        res.cookie('refreshToken',refreshToken,{
            httpOnly: true,
            maxAge: 72 * 60 * 60 * 1000
        })

        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            token:generateToken(findUser?._id)
        })
    }else{
        throw new Error("Invalid Credential")
    }
})

const handleRefreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if(!cookie.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user) throw new Error("No refresh token matched or found");
    jwt.verify(refreshToken,process.env.JWT_SECRET,(err,decode)=>{
        if(err || user.id !== decode.id)  throw new Error("Something wrong with refresh token");
        res.json({refreshToken});
    })
  });

  const logout = asyncHandler(async (req,res)=>{
    const cookie = req.cookies;
    if(!cookie.refreshToken) throw new Error("No refresh token in cookies");
    const refreshToken = cookie.refreshToken;
    const user = await User.findOne({refreshToken});
    if(!user){
        res.clearCookie("refreshToken",{
            httpOnly:true,
            secure:true
        })
        return res.sendStatus(204);
    }
   const updateRefreshToken = await User.findOneAndUpdate(
    { refreshToken: refreshToken }, // Add your actual refreshToken value here
    { $set: { refreshToken: "" } },
    { new: true } // To return the updated document
  );
    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:true
    })
    res.sendStatus(204);
    return res.sendStatus(204);
  })

const getAllUsers = asyncHandler(async(req,res)=>{
 const findAllUser = await User.find();
 if(findAllUser){
    res.json(findAllUser);
 }else{
    throw new Error("User not found");
 }
})

const getAuser = asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params;
 validateMongoDbid(id);

        const findaUser = await User.findById(id);
        if(findaUser){
            res.json(findaUser);
        }
    }catch(err){
        throw new Error(err);
    }
   
})

const deleteUser = asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params;
 validateMongoDbid(id);

        const findaUser = await User.findByIdAndDelete(id);
        if(findaUser){
            res.json(findaUser);
        }
    }catch(err){
        throw new Error(err);
    }
   
})

const updateUserDetails = asyncHandler(async (req,res) =>{
    try{
        const {_id} = req.user;
        validateMongoDbid(_id);
        const updateUser = await User.findByIdAndUpdate(_id,{
            firstname: req?.body?.firstname,
            lastname: req?.body?.lastname,
            email: req?.body?.email,
            mobile: req?.body?.mobile,
        },
        {
            new:true
        }
        );
        res.json(updateUser);
    }catch(e){
    throw new Error(e);
    }
})


const blockUser = asyncHandler(async(req,res,next)=>{
 const {id} = req.params;
 validateMongoDbid(id);

 try{
   const blockUser = await User.findByIdAndUpdate(id,
    {
        isBlocked: true
    },
    {
        new: true
    }
    );
    res.json({
        message:"User Blocked"
    })
 }catch(error){
    throw new Error(error);
 }
})

const unblockUser = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
 validateMongoDbid(id);

    try{
        const UnblockUser = await User.findByIdAndUpdate(id,
            {
                isBlocked: false
            },
            {
                new: true
            }
            );
            res.json({
                message:"User UnBlocked"
            })
    }catch(error){
        throw new Error(error);
    }
   })


module.exports = {createUser,loginUserCtrl,getAllUsers,getAuser,deleteUser,updateUserDetails,blockUser,unblockUser,handleRefreshToken,logout};