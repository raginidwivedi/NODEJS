// const express = require("express");
// const app = express();
// app.use("/test",(req,res)=>{
//     res.send("This is server response");
// })
// app.listen(3000,()=>{
//     console.log("test");
// });

















const express = require('express');
const app = express();
app.use("/testing",(req,res)=>{
   res.send("This is express js");
})
app.listen(3000,()=>{
    console.log("listening");
})