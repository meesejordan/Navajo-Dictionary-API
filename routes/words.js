const express = require("express");
const router = express.Router();

const {
    getAllWords,
    // getAllWordsStatic,
    getWord,
    addWord,
    updateWord,
} = require("../controllers/words");

router.route("/").get(getAllWords);
router.route("/:id").get(getWord).patch(updateWord);
// router.route("/static").get(getAllWordsStatic);
// router.route("/static/:id").get(getAllWordsStatic);

module.exports = router;
