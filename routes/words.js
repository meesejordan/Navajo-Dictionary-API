const express = require("express");
const router = express.Router();

const {
    getAllWords,
    // getAllWordsStatic,
    getWord,
    addWord,
} = require("../controllers/words");

router.route("/").get(getAllWords);
router.route("/:id").get(getWord).post(addWord);
// router.route("/static").get(getAllWordsStatic);
// router.route("/static/:id").get(getAllWordsStatic);

module.exports = router;
