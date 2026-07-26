// const express = require("express");
// const app = express();
// // app.use("/home",(req,res,next)=>{
// //    console.log("hander1")
// // //    res.send("hander1");
// // next();
// // },(req,res,next)=>{
// // //    res.send("handler2");
// //    next();
// // },(req,res,next)=>{
// // //    res.send("handler3")
// // next();
// // })
// const {adminAuth} = require("../middleware/auth");
// //This is middle ware 
// console.log(adminAuth);
// app.get("/admin",adminAuth,(req,res)=>{
//    // next();
//    res.send("Admin AUth");
// })

// // app.get("/admin/getUser",(req,res,next)=>{
// //    res.send("This is next handler");
// // })

// app.listen(3000,()=>{
//     console.log("listening");
// })




const express = require("express");
const app = express();
const {dbConnect} = require("../src/config/database.js");
dbConnect().then(()=>{
   console.log("Db connected");
   app.listen("3000",()=>{
    console.log("listening");
})
}).catch(()=>{
   console.log("This is error");
}) 
