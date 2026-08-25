const express = require("express");
const app = express();

const cookieParser  = require("cookie-parser");
const jwt = require("jsonwebtoken");

// convert json to js object and adding it in req.body

app.use(express.json());

//to get cookie in req
app.use(cookieParser());

app.use("/test", (req, res) => {
    res.send("THis is first route");
})

const db = require("./config/database.js");

const User = require("./model/user.js");







//Get all the data of whole users 
app.get("/users", async () => {
    try {
        const allUsers = await User.find({})

    } catch (e) {

    }

})

//Update Many Data 

app.patch("/user/update", async (req, res) => {
    try {
        const data = await User.updateMany({ firstName: "test" }, { firstName: "testupdate", email: "testupdate@gmail.com" });
        res.send("Data Updated Successfully");
    } catch (e) {
        res.status(500).send("Something went wrong while updating data");
    }

})

// Update one data 

app.patch("/user/:userId", async (req, res) => {
    try {
        const ALLOWED_PARAMS = ["firstName", "lastName", "age", "password", "skills"];

        const data = req.body;
        const isAllowed = Object.keys(data).every((k) => {
            ALLOWED_PARAMS.includes(k)
        })
        if (!isAllowed) {
            throw new Error("Update not allowed")
        }
        const userId = req.params?.userId;
        await User.findByIdAndUpdate({ _id: userId }, data, {
            returnDocument: "after",
            runValidators: true
        })
        res.send("One User has been updated")
    } catch (e) {
        res.status(500).send(e.message)
    }
})

//Delete all the user 

app.patch("/user/delete", async (req, res) => {

    try {
        await User.deleteMany({});
        res.status(200).send("All the User has been deleted");

    } catch (e) {
        res.status(400).send("Something went wrong in deleting user");
    }

})

db()
    .then(async () => {
        console.log("DB connected");

        const result = await User.syncIndexes();
        // console.log("Sync result:", result);
        // console.log(await User.collection.indexes());

        app.listen(7777, () => {
            console.log("Listening");
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(7777, () => {
    console.log("listening");
})
