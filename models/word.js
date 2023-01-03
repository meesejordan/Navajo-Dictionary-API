const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: [true, "Navajo word must be provided"],
        },
        wordDefinitions: {
            type: [String],
            required: [
                true,
                "One Definition for the given Navajo word must be provided",
            ],
        },
        wordAudio: String,
        examples: {
            type: [String],
        },
        exampleAudio: [String],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Word", wordSchema);
