const mongoose = require('mongoose');

const dbConnect = () =>{
    try{
        const con = mongoose.connect(process.env.MONGODB_URL);
        console.log("database is connected")
    }catch(err){
   throw new Error(err);
    }
}

module.exports = dbConnect;