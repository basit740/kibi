const { createJournalEntry, getAccountIdsByNames } = require("../utils/intiut");

exports.createJournalEntry = async (req, res) => {
  try {
    const lines = req.body.Line; // Assuming 'lines' is an array of line items

    const accountNames = lines
      .map((line) => line.JournalEntryLineDetail?.AccountRef?.name)
      .filter((name) => name);
    const accountIdsMap = await getAccountIdsByNames(accountNames);

    for (const line of lines) {
      const accountName = line.JournalEntryLineDetail?.AccountRef?.name;
      if (accountName) {
        const accountId = accountIdsMap[accountName];
        if (!accountId) {
          return res.status(404).json({
            success: false,
            message: `Account not found: ${accountName}`,
          });
        }
        line.JournalEntryLineDetail.AccountRef.value = accountId;
        delete line.JournalEntryLineDetail.AccountRef.name;
      }
    }

    const response = await createJournalEntry({ Line: lines });
    console.log(response);
    res.json({ success: true, data: response });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
