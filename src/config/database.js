const mongoose = require("mongoose");

const db = async ()=>{
    await mongoose.connect("mongodb+srv://raginidwivedi_db_user:Gcx5sKcz6Y4EAoLh@cluster0.fvyxqkj.mongodb.net/?appName=Cluster0/test");
}

module.exports = db;
