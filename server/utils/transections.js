exports.fillRemainingTransactionValues = (transaction, userId, companyId) => {
  const { amortizationStartDateValue, amortizationEndDateValue, amount } =
    transaction;
  const startDate = new Date(amortizationStartDateValue);
  const endDate = new Date(amortizationEndDateValue);
  const months = monthsBetween(startDate, endDate);

  const currentPeriodExpense = parseFloat((amount / months).toFixed(2));
  const amortizationWaterfall = calculateAmortizationWaterfall(
    startDate,
    months,
    currentPeriodExpense
  );

  return {
    ...transaction,
    Kibi_tid: transaction.tid,
    currentPeriodExpense: currentPeriodExpense,
    amortizationWaterfall,
    remainingExpense: amount,
    expensedToDate: 0,
    Kibi_CompanyId: companyId,
    Kibi_User: userId,
    totalMonths: months,
    remainingMonths: months,
  };
};

function monthsBetween(startDate, endDate) {
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const months =
    (endYear - startYear) * 12 - startDate.getMonth() + endDate.getMonth();

  return endDate.getDate() >= 28 ? months + 1 : months;
}

function calculateAmortizationWaterfall(startDate, totalMonths, amount) {
  let amortizationWaterfall = [];
  for (let i = 0; i < totalMonths; i++) {
    const date = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + i,
      startDate.getDate()
    );
    const monthYear = `${getMonthAbbreviation(
      date.getMonth()
    )} ${date.getFullYear()}`;
    amortizationWaterfall.push({ monthYear, expenseAmount: amount });
  }
  return amortizationWaterfall;
}

function getMonthAbbreviation(monthNumber) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return monthNumber >= 0 && monthNumber < 12
    ? months[monthNumber]
    : "Invalid month number";
}
