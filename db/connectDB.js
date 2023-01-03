const mongoose = require("mongoose");

const connectDB = (url) => {
    mongoose.set("strictQuery", false);
    console.log("Database connect");
    return mongoose.connect(url, {
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
