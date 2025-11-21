const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect("mongodb://localhost:27017/food-reels")
    .then(() => {
        console.log("MongoDB Connected")

    })
        .catch((err) => {
            console.log("MongoDB Connection error:", err);
        
    })
}

module.exports = connectDB;