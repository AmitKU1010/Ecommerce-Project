const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    slug:{
        type:String,
        required:true,
        trim: true,
        lowecase:true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type:Number,
        default:0,
        select: false
    },
    images: {
        type:Array
    },
    brand: {
        type: String,
        enum: ["Apple","Sam","LG"]
    },
    color: {
        type: String,
        required: true
    },
    ratings: {
        star: Number,
        postedBy: {type: mongoose.Schema.Types.ObjectId},
      
    }
   }, 
   {
    timestamps: true
   }
   );

//Export the model
module.exports = mongoose.model('Product', productSchema);