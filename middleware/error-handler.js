const errorHandlerMiddleware = async (err, req, res, next) => {
    // console.log(err);

    if (err && err.code === 11000) {
        return res.status(400).json({
            msg: `Duplicate value entered for ${Object.keys(
                err.keyValue
            )} field, please choose another value.`,
        });
    }

    return res.status(500).json({ msg: err.message });
};

module.exports = errorHandlerMiddleware;
