const Word = require("../models/word");
const WordChanges = require("../models/wordChanges");
const WordToAdd = require("../models/wordToAdd");

const { StatusCodes } = require("http-status-codes");
const { mongoose } = require("mongoose");

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

    res.status(StatusCodes.OK).json({ words, numWords: words.length });
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

    // check if wordId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(wordId)) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(
            `${wordId} is not a valid id`
        );
        return;
    }

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
    // check that word and wordDefinitions are given
    if (!req.body.word || !req.body.wordDefinitions.length) {
        return res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({ msg: "Must include word AND wordDefinitions" });
    }

    //validate that wordDefinitions is an array
    if (!validateArray(req.body.wordDefinitions)) {
        return res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({ msg: "wordDefinitions can NOT be empty" });
    }

    // validate that values in wordDefinitions is non-empty strings
    if (!validateArrayOfStrings(req.body.wordDefinitions)) {
        return res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({ msg: "wordDefinitions can NOT be empty" });
    }

    // check if wordAudio is present
    if (req.body.wordAudio != null) {
        // check that the given values is a non-empty string
        if (!validateString(req.body.wordAudio)) {
            return res
                .status(StatusCodes.UNPROCESSABLE_ENTITY)
                .json({ msg: "wordAudio must be a non-empty string" });
        }
    }

    // check if wordAudio is present
    if (req.body.examplesAudio != null) {
        // check that the given values is a non-empty string
        if (!validateArray(req.body.examplesAudio)) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                msg: "examplesAudio must be non-empty array of non-empty strings",
            });
        }
        if (!validateArrayOfStrings(req.body.examplesAudio)) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                msg: "Values in examplesAudio must be a non-empty string",
            });
        }
    }

    // check if examples exist
    if (req.body.examples != null) {
        // check that the given values is a non-empty astring
        if (!validateArray(req.body.examples)) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                msg: "examples must be a non-empty array of non-empty strings",
            });
        }
        if (!validateArrayOfStrings(req.body.examples)) {
            return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
                msg: "Values in examples must be a non-empty string",
            });
        }
    }

    const word = await WordToAdd.create(req.body);
    res.status(StatusCodes.OK).json({ word });
};

const updateWord = async (req, res) => {
    const {
        params: { id: wordId },
    } = req;

    // check if wordId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(wordId)) {
        res.status(StatusCodes.UNPROCESSABLE_ENTITY).send(
            `${wordId} is not a valid id`
        );
        return;
    }

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
    const Wordchanges = await WordChanges.create(req.body);
    // res.send("addWord");
    res.status(StatusCodes.CREATED).json({ word });
};

const validateArrayOfStrings = (arr1) => {
    let isValid = true;
    arr1.map((val) => {
        if (
            !(
                val !== "" &&
                val !== " " &&
                typeof val === "string" &&
                val.length > 0
            )
        ) {
            isValid = false;
        }
    });

    return isValid;
};

const validateArray = (arr1) => {
    let isValid = true;
    if (!(arr1 && typeof arr1 === "object" && arr1.length > 0)) {
        isValid = false;
    }

    return isValid;
};

const validateString = (str1) => {
    let isValid = true;
    if (!(str1 !== "" && typeof str1 === "string" && str1.length > 0)) {
        isValid = false;
    }
    return isValid;
};
module.exports = {
    getAllWords,
    getAllWordsStatic,
    getWord,
    addWord,
    updateWord,
};
