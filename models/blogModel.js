const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required: true
    },
   numView:{
   type:Number,
   default:0
   },
   isLiked:{
   type:Boolean,
   default:false
   },
   isDisliked:{
    type:Boolean,
    default:false
   },
   likes:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   },
   dislikes:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
   },
   image:{
    type: String,
    default:"https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_640.jpg"
   },
   author:{
    type: String,
    default:"Admin"
   },
   },
   {
    toJson:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    },
    timestamps: true
   }
   );
//Export the model
module.exports = mongoose.model('Blog', blogSchema);