const mongoose = require("mongoose");
const schema = mongoose.Schema({
    firstName:{ type:String },
    lastName:{ type:String},
    email:String,
    password:String,
    gender:String,
    age:Number,
    date: { type: Date, default: Date.now }

})
module.exports = mongoose.model("User",schema);