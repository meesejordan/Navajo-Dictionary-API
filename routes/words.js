const express = require("express");
const router = express.Router();

// validators
const {
    IdValidator,
    addWordValidator,
    updateWordValidator,
} = require("../middleware/validators/index");
// controllers
const {
    getAllWords,
    // getAllWordsStatic,
    getWord,
    addWord,
    updateWord,
} = require("../controllers/words");

router.route("/").get(getAllWords).put(addWord);
router
    .route("/:id")
    .get(IdValidator, getWord)
    .patch(IdValidator, updateWordValidator, updateWord);
// router.route("/static").get(getAllWordsStatic);
// router.route("/static/:id").get(getAllWordsStatic);

module.exports = router;
