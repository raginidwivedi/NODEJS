const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth.js");



//Get profile 

profileRouter.post("/profile",userAuth,async (req,res) =>{
     
    res.send(req.user);
})
module.exports = {profileRouter};
