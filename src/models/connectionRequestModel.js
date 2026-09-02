const mongoose = require("mongoose");
const connectionRequestSchema = mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:["ignore","interested","accepted","rejected"],
        message:`{VALUE} is incorrect type`
    }
},{timestamps:true});
connectionRequestSchema.pre("save",function (next) {
    connectionRequest = this;
    if((connectionRequest.fromUserId).equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send request to yourself");
    }
    next();
})
const ConnectRequestModel = mongoose.model("connectionRequest",connectionRequestSchema);

module.exports = ConnectRequestModel;