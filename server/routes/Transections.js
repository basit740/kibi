const express = require("express");
const router = express.Router();

const {
  getTransactions,
  saveTransactions,
  getTransactionsFromDb,
  updateTransaction,
  updateMultipleTransactions,
} = require("../controllers/transections");

router.get("/", getTransactions);
router.post("/save-transections", saveTransactions);
router.get("/get-transections-from-db", getTransactionsFromDb);
router.post("/update-transections", updateMultipleTransactions);
router.post("/update-transection", updateTransaction);
module.exports = router;
