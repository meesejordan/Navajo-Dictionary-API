const express = require("express");
const router = express.Router();

const { getAllWords, getAllWordsStatic } = require("../controllers/words");

router.route("/").get(getAllWords);
router.route("/static").get(getAllWordsStatic);

module.exports = router;
