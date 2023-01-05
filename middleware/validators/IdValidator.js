const { StatusCodes } = require("http-status-codes");
const { mongoose } = require("mongoose");

const IdValidator = (req, res, next) => {
    const {
        params: { id: wordId },
    } = req;

    // check if wordId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(wordId)) {
        return res
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .json({ msg: `${wordId} is not a valid id` });
    } else {
        next();
    }
};

module.exports = { IdValidator };
