const jwt = require("jsonwebtoken");
const User = require("../model/user.js");
const userAuth = async (req, res, next) => {

    try {
   
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Token is not valid");
        }
        decodedMsg = await jwt.verify(token, "admin1234@");
        if (decodedMsg._id) {
            const user = await User.findOne({_id:decodedMsg._id});
            req.user = user;
            next();
        } else {
            throw new Error("User does not exist")
        }
    } catch (e) {
       res.send(e.message);
    }

}
module.exports = {userAuth} ;