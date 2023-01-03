const Word = require("../models/word");

const getAllWordsStatic = async (req, res) => {
    const queryObject = {};
    // queryObject.wordDefinitions = { $regex: "it", $options: "i" };
    const words = await Word.find(queryObject).sort("word");

    res.status(200).json({ words, numWords: words.length });
};

const getAllWords = async (req, res) => {
    console.log(req.query);
    const { search, sort } = req.query; //, fields } = req.query;
    test = req.query.sort;
    const queryObject = {};

    // check ifsearch parameter is pass, then search wordDefinitions for the search value
    if (search) {
        queryObject.wordDefinitions = { $regex: search, $options: "i" };
    }

    let result = await Word.find(queryObject);
    // sort on given values or sort on creation date by default
    if (test) {
        // get list of values to sort on
        const sortList = test.split(",").join(" ");
        console.log(sortList);
        result = await result.sort(sortList);
    }

    // // Select current fields, like SQL select
    // if (fields) {
    //     const fieldsList = fields.split(",").join(" ");
    //     result = result.select(fieldsList);
    // }
    res.status(200).json({ result, numWords: result.length });
};

module.exports = {
    getAllWords,
    getAllWordsStatic,
};
