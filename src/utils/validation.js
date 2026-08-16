const validator = require("validator");
const validateSignData = (req) => {

    const {firstName,lastName,password,email} = req.body;
console.log(email);
    if(!firstName || !lastName) {
        throw new Error("Name is not valid");
    } 
    else if (!validator.isEmail(email)) {

        throw new Error("Email id is not correct")
    }
  
}
module.exports = {validateSignData}