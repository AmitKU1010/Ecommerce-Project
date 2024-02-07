const Product = require("../models/productModel");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const createProduct = asyncHandler(async (req,res)=>{
    if(req.body.title){
        req.body.slug = slugify(req.body.title);
    }
    try{
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
    }catch(e){
        throw new Error(e);
    }
})

const getaProduct = asyncHandler(async (req,res)=>{
    try{
    const {id} = req.params;
    const getaProduct = await Product.findById(id);
    res.json(getaProduct);
    }catch(e){
        throw new Error(e);
    }
})


const getAllProduct = asyncHandler(async (req,res)=>{
    try{
    const newProduct = await Product.find();
    res.json(newProduct);
    }catch(e){
        throw new Error(e);
    }
})

const updateProduct = asyncHandler(async(req,res)=>{
    if(req.body.title){
        req.body.slug = slugify(req.body.title);
    }
    const {id} = req.params;
    const updateProduct = await Product.findOneAndUpdate(
        { _id: id }, // Assuming _id is the field you're matching against
        req.body,
        {
            new: true
        }
    );
    res.json(updateProduct);
})

const deleteProduct = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json({msg:"product deleted"});
})

module.exports = {createProduct,getAllProduct,getaProduct,updateProduct,deleteProduct};