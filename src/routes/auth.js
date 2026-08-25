const express = require("express");
const route = express.Router();
const { validateSignData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");


route.post("/signup", async (req, res) => {

    try {
        //Validation of data 
        validateSignData(req);
        const { firstName, lastName, password, email, age, skills } = req.body;
        //Encrypt the password
        const hashPass = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName,
            lastName,
            password: hashPass,
            email,
            age,
            skills
        });
        await newUser.save();
        res.send("Added data successfully");
    } catch (e) {
        res.send(e.message);
    }

})

//Login Api

route.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const userData = await User.findOne({ email: emailId });
        if (!userData) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await userData.verifyPassword(password);
       
        if (isPasswordValid) {

            // Create a JWT Token 
            const token = await userData.getJWT();

            // Add token to cookie 

            res.cookie("token",token);
            //Send response back to user 
            res.send("Login Successfully")
        } else {
            res.status(400).send("Password is not correct");
        }

    } catch (e) {
        res.status(400).send(e.message);
    }
})
module.exports = {route};