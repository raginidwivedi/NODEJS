const express = require("express");
const connectionRouter = express.Router();

const { userAuth } = require("../middleware/auth.js");
const User = require("../models/user.js");

const connectionRequestModel = require("../models/connectionRequestModel.js");
connectionRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
   const user = req.user;
   console.log("sending connection request");
   const fromUserId = req.user._id;

   const toUserId = req.params.toUserId;
   const status = req.params.status;

   try {
      const isUserExist = await User.findOne({ "_id": fromUserId });
      if (!isUserExist) {
         throw new Error("Invalid connection request");
      }

      const connAlreadyExist = await connectionRequestModel.findOne({
         $or: [
            { fromUserId, toUserId }, { fromUserId: toUserId, toUserId: fromUserId }
         ]
      });
      if (connAlreadyExist) {
         throw new Error("connection request already exist");
      }
      const connectionData = await new connectionRequestModel({ fromUserId, toUserId, status });
      await connectionData.save();
      if (connectionData.fromUserId) {
         res.send(user.firstName + " sent the connection request");
      }

   } catch (exception) {
      res.send(exception.message);
   }

})

//api for request review,only 2 status is valid one is accepted and one is rejected
connectionRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {

   try {

   //request validation
   const allowedStatus = ['accepted', 'rejected'];
   if (!allowedStatus.includes(req.params.status)) {
      throw new Error("Status is not valid");
   }
   //check if request id actually exist or not , status is interested only 
   const isRequestExist = await connectionRequestModel.findOne({ _id: req.params.requestId });
   if (!isRequestExist) {
      throw new Error("Request does not exist");
   }
   const connectionRequest = await connectionRequestModel.findOne({
      _id: req.params.requestId,
      status: "interested",
      toUserId: req.user._id
   })
   if (connectionRequest) {
      connectionRequest.status = req.params.status;
      await connectionRequest.save();
      res.json({ message: "Connected request" + req.params.status });

   } else {
      res.json({ message: "Request is invalid" }).send();
   }} catch(error) {
      res.json({message:error.message}).status(400);
   }
})


module.exports = { connectionRouter };