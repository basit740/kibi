const express = require("express");
const router = express.Router();

const { createJournalEntry } = require("../controllers/journalEntry");

router.post("/post", createJournalEntry);
module.exports = router;
