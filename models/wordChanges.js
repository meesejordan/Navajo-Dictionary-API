const mongoose = require("mongoose");

// A copy of a word that exists in the database.
// Inside a different collection and contains possible corrections
// and/or additions to a Word.
// wordId must be a valid word in the Word collection.

// rather than changing the word, it is created in a different collection
// to be vetted and any changes will be made to the Word collection
const wordChanges = new mongoose.Schema(
    {
        wordId: {
            type: mongoose.Types.ObjectId,
            required: [
                true,
                "Please provide the id of the word you wish to add changes to",
            ],
        },
        word: {
            type: String,
        },
        wordDefinitions: {
            type: [String],
        },
        wordAudio: {
            type: String,
        },
        examples: {
            type: [String],
        },
        examplesAudio: [String],
    },
    { timestamps: true }
);

// validate that one parameter is provided
wordChanges.pre("validate", function (next) {
    if (
        !(
            this.word &&
            this.wordDefinitions &&
            this.wordAudio &&
            this.examples &&
            this.examplesAudio
        )
    ) {
        return next(
            new Error(
                "At least one field must be provided and fields cannot be empty"
            )
        );
    }
    next();
});

module.exports = mongoose.model("WordToAdd", wordChanges);
