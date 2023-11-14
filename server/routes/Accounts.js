const express = require("express");
const router = express.Router();
const {
  storeAccounts,
  getAccounts,
  getAvailableAccounts,
  changeAccountStatus,
  changeAllAccountsStatus,
  getSelectAllAccountsValue,
  getQuickbooksBalance,
} = require("../controllers/accounts");

router.route("/get-selectall-accounts-value").get(getSelectAllAccountsValue);
router.route("/available-account-details").get(getAvailableAccounts);
router.route("/account-details").get(getAccounts);
router
  .route("/change-all-accounts-availability-status")
  .post(changeAllAccountsStatus);
router.route("/change-availablility-status").post(changeAccountStatus);
router.route("/get-quickbooks-balance").get(getQuickbooksBalance);

module.exports = router;
