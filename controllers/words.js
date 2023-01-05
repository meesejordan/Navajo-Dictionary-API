const Word = require("../models/word");
const WordChanges = require("../models/wordChanges");
const WordToAdd = require("../models/wordToAdd");
const WordsToDelete = require("../models/wordToDelete");

const { StatusCodes } = require("http-status-codes");

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
    // get page number if given, default is 1
    const page = Number(req.query.page) || 1;
    // get limit per page if given, default is 10
    const limit = Number(req.query.limit) || 10;
    // calculate how many words to skip
    const skip = (page - 1) * limit;

    // Finally, search words based on search query, get words sorted on given sort value and finally return the fields of the given field values
    let result = await Word.find(queryObject)
        .sort(sortList) //sort on given field
        .select(fieldsList) // return selected fields
        .skip(skip) // skip based on paganation
        .limit(limit); // return limit of words
    res.status(StatusCodes.OK).json({ result, numWords: result.length });
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
        res.status(StatusCodes.NOT_FOUND).send(`No word with id ${jobId}`);
        return;
    }

    // send word with matching id
    res.status(StatusCodes.OK).json({ word, numWords: word.length });
};

const addWord = async (req, res) => {
    // res.status(StatusCodes.OK).send("passed validation");
    const word = await WordToAdd.create(req.body);
    res.status(StatusCodes.OK).json({ word });
};

const updateWord = async (req, res) => {
    const {
        params: { id: wordId },
    } = req;

    // get word with matching id
    const word = await Word.findOne({ _id: wordId });

    // if no word exits, throw error
    if (!word) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .send(`No word with id ${jobId}`);
    }

    // add the Word id to change, as a property of the WordToAdd
    req.body.wordId = wordId;

    // add Word changes to collection Word
    const wordChanges = await WordChanges.create(req.body);

    // res.status(200).send("passed update validation");
    res.status(StatusCodes.CREATED).json({ word: wordChanges });
};

const deleteWord = async (req, res) => {
    // get id from paramters
    const {
        params: { id: wordId },
    } = req;

    // get word with matching id
    const word = await Word.findOne({ _id: wordId });

    // if no word exits, throw error
    if (!word) {
        res.status(StatusCodes.NOT_FOUND).send(`No word with id ${jobId}`);
        return;
    }

    req.body.wordIdToDelete = wordId;
    console.log(req.body);
    const wordToDelete = await WordsToDelete.create(req.body);

    res.status(StatusCodes.ACCEPTED).json({ word: wordToDelete });
};
module.exports = {
    getAllWords,
    getWord,
    addWord,
    updateWord,
    deleteWord,
};
