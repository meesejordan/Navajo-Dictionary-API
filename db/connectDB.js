const mongoose = require("mongoose");

const connectDB = (url) => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(url, {
        useUnifiedTopology: true,
    });
};

module.exports = connectDB;
