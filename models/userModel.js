const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
    },
    mobile:{
        type:String,
    },
    password:{
        type:String,
    },
    role:{
        type:String,
        default:"user"
    },
    isBlocked: {
            type:Boolean,
            default: false
    },
    cart: {
        type:Array,
        default : [],
    },
    address: [{type:mongoose.Schema.Types.ObjectId, ref: "Address"}],
    wishlist: [{type:mongoose.Schema.Types.ObjectId, ref:"Product"}],
    refreshToken: {
        type: String
    }
   },
   {
    timestamps: true
   }
   );


userSchema.pre('save', async function (next) {
    try {
      if (!this.password) {
        throw new Error('Password is required.');
      }
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });
//for password hasing

userSchema.methods.isPasswordMatched = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}


//Export the model
module.exports = mongoose.model('User', userSchema);