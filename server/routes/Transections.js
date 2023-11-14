const express = require("express");
const router = express.Router();

const {
  getTransactions,
  saveTransactions,
  getTransactionsFromDb,
} = require("../controllers/transections");

router.get("/", getTransactions);
router.post("/save-transections", saveTransactions);
router.get("/get-transections-from-db", getTransactionsFromDb);
module.exports = router;
