const express = require("express");
const app = express();
const User = require("./models/user.js")
app.get("/signup",async (req,res)=>{
    const data = {
        "firstName":"Ragini",
        "lastName":"Dwivedi",
        "age":24,
        "email":"ragini@gmail.com",
        "password":"ragini123",
        "gender":"female"
    }
    const user = await new User(data);
    try {
       user.save();
       console.log("test");
       res.send("Data entered successfully");
    } catch(error) {
      res.status(400).send("Something went wrong");
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
