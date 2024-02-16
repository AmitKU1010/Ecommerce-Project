const Blog = require('../models/blogModel');
const userModel = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');


const createBlog = asyncHandler(async(req,res)=>{
    try{
    const createBlog = await Blog.create(req.body);
    res.json(createBlog);
    }catch(e){
    throw new Error(e);
    }
})

const getaBlog = asyncHandler(async(req,res)=>{
    try{
    const {id} = req.params;
    const getaBlog = await Blog.findById(id);
    res.json(getaBlog);
    }catch(e){
    throw new Error(e);
    }
})

module.exports = {createBlog,getaBlog};
