const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middleware/auth.js");
const connectionRequestModel = require("../models/connectionRequestModel.js");
const { route } = require("./auth.js");

//get all the pending request of a loggedin user
userRouter.get("/user/requests/received",userAuth,async (req,res,next)=>{
    try {
       const acceptedConnection =  await connectionRequestModel.find({
            toUserId:req.user._id,
            status:"interested"
        }).populate("fromUserId","firstName lastName");
        
        res.json({message:acceptedConnection});
    } catch(error) {
        throw new Error(error.message);
        res.json({message:error.message})
    }
})


userRouter.get("/user/connections",userAuth,async (req,res,next) => {
    try {
        const connections = await connectionRequestModel.find({
            $or:[
                {fromUserId:req.user._id,status:"accepted"},
                {toUserId:req.user._id,status:"accepted"}
            ]
        }).populate("fromUserId","firstName lastName skills");
        const data = connections.map((row)=> row.fromUserId)
        res.json({message:"All conections",data:data});
    } catch(error) {
       res.json({message:error.message});
    }
});

module.exports = {userRouter};