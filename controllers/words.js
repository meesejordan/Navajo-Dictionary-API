const Word = require("../models/word");
const notFoundError = require("../middleware/not-found");

const getAllWordsStatic = async (req, res) => {
    // const queryObject = {};
    const {
        params: { id: wordId },
    } = req;
    console.log(wordId);
    // queryObject.wordDefinitions = { $regex: "it", $options: "i" };
    // const words = await Word.find(queryObject).sort("word").select("");
    const words = await Word.findOne({
        _id: "63b383cd227e1ecb14d4930d",
    });

    res.status(200).json({ words, numWords: words.length });
};

const getAllWords = async (req, res) => {
    // console.log(req.query);
    const { search, fields } = req.query;
    const queryObject = {};
    let sortList = "";
    let fieldsList = "";

    // check if search parameter is passed, then search wordDefinitions for the search value
    if (search) {
        queryObject.wordDefinitions = { $regex: search, $options: "i" };
    }

    // sort on given values or sort on creation date by default
    if (req.query.sort) {
        // get list of values to sort on
        sortList = req.query.sort.split(",").join(" ");
        // console.log(sortList);
    }

    // Select current fields, like SQL select
    if (fields) {
        fieldsList = fields.split(",").join(" ");
    }

    // paganation
    // get page if given, default is 1
    const page = Number(req.query.page) || 1;
    // get limit per page if it is given, default is 10
    const limit = Number(req.query.limit) || 10;
    // calculate how many words to skip
    const skip = (page - 1) * limit;

    // Finally, search words based on search query, get words sorted on given sort value and finally return the fields of the given field values
    let result = await Word.find(queryObject)
        .sort(sortList) //sort on given field
        .select(fieldsList) // return selected fields
        .skip(skip) // skip based on paganation
        .limit(limit); // return limit of words
    res.status(200).json({ result, numWords: result.length });
};

// gets word based of mongo generate id '_id'
const getWord = async (req, res) => {
    // get id from paramters
    const {
        params: { id: wordId },
    } = req;

    // get word with matching id
    const word = await Word.findOne({ _id: wordId });

    // if no word exits, throw error
    if (!word) {
        throw new notFoundError(`No job with id ${jobId}`);
    }

    // send word with matching id
    res.status(200).json({ word, numWords: word.length });
};

module.exports = {
    getAllWords,
    getAllWordsStatic,
    getWord,
};
