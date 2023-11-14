exports.fillRemainingTransectionValues = (transection, userId, companyId) => {
  // currentperiodexpense, amortizationwaterfall, expensedtodate, remainingexpense
  const startDate = new Date(transection.amortizationStartDateValue);
  const endDate = new Date(transection.amortizationEndDateValue);
  const months = monthsBetween(startDate, endDate);
  const expensedToDate = 0;
  const remainingExpense = transection.amount;
  let currentPeriodExpense = transection.amount / months;
  currentPeriodExpense = currentPeriodExpense.toFixed(2);
  const amortizationWaterfall = calculateAmortizationWaterfall(
    startDate.getMonth() + 1,
    months,
    startDate.getFullYear(),
    currentPeriodExpense
  );
  return {
    ...transection,
    Kibi_tid: transection.tid,
    currentPeriodExpense: currentPeriodExpense,
    amortizationWaterfall: amortizationWaterfall,
    remainingEspense: remainingExpense,
    expensedToDate: expensedToDate,
    Kibi_CompanyId: companyId,
    Kibi_User: userId,
    totalMonths: months,
    remainingMonths: months,
  };
};
function monthsBetween(startDate, endDate) {
  // Ensure that the start date is before the end date
  if (startDate > endDate) {
    // Swap dates if start date is after end date
    var temp = startDate;
    startDate = endDate;
    endDate = temp;
  }

  var months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();

  // Adding one to include the start month if the end day is greater than or equal to the start day
  if (endDate.getDate() >= 28) {
    months++;
  }

  return months;
}
const calculateAmortizationWaterfall = (
  startMonth,
  totalMonths,
  year,
  amount
) => {
  let amortizationWaterfall = [];
  let month = startMonth;
  for (let i = 0; i < totalMonths; i++) {
    if (month > 12) {
      month = month - 12;
      year++;
    }
    let monthYear = `${getMonthAbbreviation(month)} ${year}`;
    amortizationWaterfall.push({
      monthYear: monthYear,
      expenseAmount: amount,
    });
    month++;
  }
  return amortizationWaterfall;
};

function getMonthAbbreviation(monthNumber) {
  // Array of month abbreviations
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
  // Check if the month number is valid (1-12)
  if (monthNumber < 1 || monthNumber > 12) {
    return "Invalid month number";
  }
  // Return the corresponding month abbreviation
  // Subtract 1 from monthNumber since array indexing starts at 0
  return months[monthNumber - 1];
}
