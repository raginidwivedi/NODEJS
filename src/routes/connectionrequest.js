const express = require("express");
const connectionRouter = express.Router();

const {userAuth} = require("../middleware/auth.js");
const User = require("../models/user.js");

const connectionRequestModel = require("../models/connectionRequestModel.js");
connectionRouter.post("/request/send/:status/:fromUserId",userAuth,async (req,res)=>{
   const user = req.user;
   console.log("sending connection request");
   const fromUserId = req.user._id;

   const toUserId = req.params.fromUserId;
   const status = req.params.status;
   
   try {
      console.log(User);
      console.log(user);
      const isUserExist = await User.findOne({"_id":fromUserId});
      if(!isUserExist) {
         throw new Error("Invalid connection request");
      }
     
      const connAlreadyExist = connectionRequestModel.findOne({
         $or:[
            {fromUserId,toUserId}, {fromUserId:toUserId,toUserId:fromUserId}
         ]
      });
      if(connAlreadyExist) {
         throw new Error("connection request already exist");
      }
      const connectionData = await new connectionRequestModel({fromUserId,toUserId,status});
      await connectionData.save();
      if(connectionData.fromUserId) {
         res.send(user.firstName+ " sent the connection request");
      } 
      
   } catch(exception) {
     res.send(exception.message);
   }
   


})

module.exports = {connectionRouter};