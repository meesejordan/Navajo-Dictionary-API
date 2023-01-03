require("dotenv").config();

const connectDB = require("./db/connectDB");
const Word = require("./models/word");

const jsonWords = require("./words.json");

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // await Word.deleteMany(); uncomment to delte words already in the db
        await Word.create(jsonWords);
        console.log("success!!");
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

start();
