const mongoose = require("mongoose");

const wordToDeleteSchema = new mongoose.Schema({
    wordIdToDelete: {
        type: mongoose.Types.ObjectId,
        required: [
            true,
            "Please provide the id of the word you to flag for deletion",
        ],
    },
});

module.exports = mongoose.model("WordsToDelete", wordToDeleteSchema);
