const Word = require("../models/word");

const getAllWordsStatic = async (req, res) => {
    const queryObject = {};
    // queryObject.wordDefinitions = { $regex: "it", $options: "i" };
    const words = await Word.find(queryObject).sort("word").select("");

    res.status(200).json({ words, numWords: words.length });
};

const getAllWords = async (req, res) => {
    console.log(req.query);
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

    // Finally, search words based on search query, get words sorted on given sort value and finally return the fields of the given field values
    let result = await Word.find(queryObject).sort(sortList).select(fieldsList);
    res.status(200).json({ result, numWords: result.length });
};

module.exports = {
    getAllWords,
    getAllWordsStatic,
};
