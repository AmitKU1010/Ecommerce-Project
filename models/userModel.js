const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
   },
   {
    timestamps: true
   }
   );


userSchema.pre('save', async function (next) {
    try {
        if(!this.isModified('password')){
            next();
        }
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
userSchema.methods.createPasswordResetToken = async function(){
    const resetToken  = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //10 minutes
    return await resetToken;
}


//Export the model
module.exports = mongoose.model('User', userSchema);