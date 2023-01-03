const Word = require("../models/word");

const getAllWordsStatic = async (req, res) => {
    const queryObject = {};
    queryObject.wordDefinitions = { $regex: "it", $options: "i" };
    const words = await Word.find(queryObject);

    res.status(200).json({ words, numWords: words.length });
};

const getAllWords = async (req, res) => {
    const { search, sort, fields } = req.body;
    const queryObject = {};

    // check ifsearch parameter is pass, then search wordDefinitions for the search value
    if (search) {
        queryObject.wordDefinitions = { $regex: search, $options: "i" };
    }

    let result = Word.find(queryObject);
    // sort on given values or sort on creation date by default
    if (sort) {
        // get list of values to sort on
        const sortList = sort.split(",").join(" ");
        result = result.sort(sortList);
    } else {
        result = result.sort("createdAt");
    }

    // Select current fields, like SQL select
    if (fields) {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }
};

module.exports = {
    getAllWords,
    getAllWordsStatic,
};
