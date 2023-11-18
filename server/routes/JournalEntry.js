const express = require("express");
const router = express.Router();

const { postJournalEntry } = require("../controllers/journalEntry");

router.post("/post", postJournalEntry);
module.exports = router;
