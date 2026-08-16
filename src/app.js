const express = require("express");
const app = express();
app.use(express.json());//app.use basically run on every request if no route is passed in this
const User = require("./models/user.js")

//Sign up Api
app.post("/signup",async (req,res)=>{
    // console.log(req.body);
    const user = await new User(req.body);
    try {
       user.save();
       res.send("Data entered successfully");
    } catch(error) {
      res.status(400).send("Something went wrong");
    }

})


//Get user by email 
app.get()


//Feed Api Get all the users from data

app.get(()=>{

})


//Api to Login user
//JWT token, bcrypt,
app.post("/login",async (req,res)=>{
   const emailId = req.body.email; 
   const userData = await User.findOne({email:emailId});
   if(!userData) {
      throw Error("Creds are not valid");
   } else {
      
   }


})




const {dbConnect} = require("../src/config/database.js");
dbConnect().then(()=>{
   console.log("Db connected");
   app.listen("3000",()=>{
    console.log("listening");
})
}).catch(()=>{
   console.log("This is error");
}) 
