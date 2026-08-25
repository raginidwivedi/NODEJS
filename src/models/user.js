const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema({
    firstName: {
        type:String,
        required:true,
        minLength:3,
        maxLength:50
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value) {
            if(!(validator.isEmail(value))) {
                throw new Error("Email Id is not valid")
            }
        }
    },
    password:String,
    age:{
        type:Number,
        min:18
    },
    gender:{
       type:String,
       validate (value) {
        if(!["female","male","others"].includes(value)) {
            throw new Error("Gender data is not correct")
        }
       }
    },
    photoUrl :{
        type:String
    },
    about: {
        type:String,
        default:"This is default about us"
    },
    skills:{
        type:[String]
    }

} , {timestamps:true})

schema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id:user._id},"admin1234@",{expiresIn:"1d"});
    return token;
}
schema.methods.verifyPassword = async function (passwordEnterByUser) {
    const user = this;

    const isPassValid = await bcrypt.compare(passwordEnterByUser,user.password);
    return isPassValid;
}
module.exports = mongoose.model("User",schema);