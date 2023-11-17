const express = require("express");
const router = express.Router();

const {updateTransaction} = require("../controllers/journalEntry");

router.post("/post", updateTransaction);
module.exports = router;
