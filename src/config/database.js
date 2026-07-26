const mongoose = require("mongoose");

const dbConnect = async() => {
    await mongoose.connect("mongodb+srv://raginidwivedi103_db_user:admin123@cluster0.nykha0s.mongodb.net/devTinder");
}
module.exports = {dbConnect};