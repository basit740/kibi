const {getExpenseTransactionsByMonth} = require('../utils/intiut')

exports.getTransactions = async (req, res) => {

    try {
      // Code to fetch transactions from Intuit API (similar to what you've implemented before)
      // ...
      console.log('i am here')
      const transectionsData = await getExpenseTransactionsByMonth();
  
      // Assuming transactionsData contains the data fetched from Intuit API
      res.json({ success: true, data: transectionsData.transactions });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
