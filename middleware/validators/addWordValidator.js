const { check, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
module.exports.addWordValidator = [
    // check required string
    check("word")
        .isString()
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Word can not be empty!")
        .withMessage("Word cannot be a number"),
    // check required array
    check("wordDefinitions.*")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Definition can not be empty!")
        .isString(),
    // check optional string
    check("wordAudio").trim().escape().isString().optional().notEmpty(),
    // check optional array
    check("examplesAudio").isArray({ min: 1, max: 10 }).optional(),
    check("examplesAudio.*")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Example Audio can not be empty!")
        .isString(),
    // check optional array
    check("examples")
        .isArray({ min: 1, max: 10 })
        .withMessage("Must have 1 to 10 Examples!")
        .optional(),
    check("examples.*")
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage("Individul Examples can not be empty!")
        .isString(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(StatusCodes.UNPROCESSABLE_ENTITY)
                .json({ msg: errors.array() });
        }
        next();
    },
];
