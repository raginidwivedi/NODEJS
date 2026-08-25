const express = require("express");
const router = express.Router();
const {userAuth} = require("../middleware/auth.js");



//Get profile 

app.post("/profile",userAuth,async (req,res) =>{
     
    res.send(req.user);
})
