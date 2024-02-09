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
        //filtering
        const queryObj = {...req.query};
        const excludeFields = ['page','sort','limit','fields'];
        excludeFields.forEach((ele)=>{
            delete queryObj[ele];
        })
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = Product.find(JSON.parse(queryStr))
        //filtering

        //Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(" ")
          query = query.sort(sortBy)
        }else{
            query = query.sort('-createdAt')

        }
        //Sorting

        //Limiting
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(" ");
            query = query.select(fields);
        }else{
            query = query.select('-__v');
        }

        //Limiting

        //pagination
        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page-1) * limit;
        query = query.skip(skip).limit(limit);
        console.log(page,limit,skip);

        if(req.query.page){
            const productCount = await Product.countDocuments();
            if(skip>=productCount){
                throw new Error("This page doesn't exits");
            }
        }

        //pagination

        const product = await query;
        console.log(JSON.parse(queryStr));



    
    res.json(product);
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