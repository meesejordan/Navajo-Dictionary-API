require("dotenv").config(); //set mongodb URI in env
require("express-async-errors");

const express = require("express");
const app = express();

// connect to database
const connectDB = require("./db/connectDB");

// import routers
const wordsRouter = require("./routes/words");
app.get("/", (req, res) => {
    res.send("Navajo Dictionary API");
});

// Words route
app.use("/api/v1/words", wordsRouter);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        // wait for the database to connect
        await connectDB(process.env.MONGO_URI);
        console.log("Database connect");
        app.listen(
            port,
            console.log(`Server is listening on port ${port}....`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
