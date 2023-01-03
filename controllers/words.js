const Word = require("../models/word");

const getAllWordsStatic = async (req, res) => {
    const words = await Word.find({});

    res.status(200).json({ words, length: words.length });
};

const getAllWords = async (req, res) => {
    const { name, sort, fields } = req.body;
    const queryObject = {};

    // check if name is provided
    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
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
