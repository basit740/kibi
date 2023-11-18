const { json } = require("express");
const { createJournalEntry } = require("../utils/intiut");

exports.postJournalEntry = async (req, res) => {
  try {
    const journalEntry = req.body;
    console.log(JSON.stringify(journalEntry));
    const response = await createJournalEntry(journalEntry);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
