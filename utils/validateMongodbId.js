const mongoose = require('mongoose');

const validateMongoDbid = (id) =>{
    const valid = mongoose.Types.ObjectId.isValid(id);
    if(!valid){
        throw new Error("Mongodb id Is not valid")
    }
}
module.exports = validateMongoDbid;