const express = require("express");
const app = express();
app.use("/home",(req,res,next)=>{
   console.log("hander1")
//    res.send("hander1");
next();
},(req,res,next)=>{
//    res.send("handler2");
   next();
},(req,res,next)=>{
//    res.send("handler3")
next();
})
app.listen(3000,()=>{
    console.log("listening");
})
