const mongoose = require("mongoose");

// word => Navajo word ex."Yá'át'ééh"
// wordDefition => array of definitions ex. ["Hello", "It is good", "Greetings"]
// wordAudio => string link with spoken word ex. "https://dl.dropbox.com/s/z3gm2v9ezt4vdk1/commonNavajo-1-0",
// examples => array of example use of the word. ex. [// "Yá'át'ééh dóó ahéehee:Hello and thank you",// "Yá'át'ééh abini:Good morning",// ]
// examplesAudio => array of urls of the given examples. ex: [ //"https://dl.dropbox.com/s/z3gm2v9ezt4vdk1/commonNavajo-1-0", //"https://dl.dropbox.com/s/j0g7iy2gmjig1k8/commonNavajo-1-1", // ],

// 'examples' indices map to 'audioExamples'. IFF audioExamples exist
const wordSchema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: [true, "Navajo word must be provided"],
            unique: true,
        },
        wordDefinitions: {
            type: [String],
            required: [
                true,
                "One Definition for the given Navajo word must be provided",
            ],
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

module.exports = mongoose.model("Word", wordSchema);
