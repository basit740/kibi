// intuitSlice.js
import { createSlice } from "@reduxjs/toolkit";
function getCurrentDateFormatted() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
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
let date = new Date();
const monthYear = `${getMonthAbbreviation(
  date.getMonth()
)} ${date.getFullYear()}`;

const intuitSlice = createSlice({
  name: "intuit",
  initialState: {
    periodEndDate: getCurrentDateFormatted(),
    monthYear: monthYear,
    transections: null,
    savedTransections: [],
    journalEntries: [],
    waterfall: [],
    editableSavedTransection: null,
    amortizationWaterfallEntries: [],
    quickbooksBalance: null,
    subledgerBalance: null,
  },
  reducers: {
    setTransections: (state, action) => {
      state.transections = action.payload;
    },
    updateTransection: (state, action) => {
      const { id, name, value } = action.payload;
      const newTransections = state.transections.map((transection) => {
        if (transection.tid === id) {
          transection[`${name}Value`] = value;
        }
        return transection;
      });
      state.transections = [...newTransections];
      console.log(newTransections);
    },
    updateSavedTransection: (state, action) => {
      const { id, name, value } = action.payload;
      state.editableSavedTransection[`${name}Value`] = value;
    },
    saveUpdatedTransection: (state, action) => {
      const newTransections = state.savedTransections.map((transection) => {
        if (transection.Kibi_tid === state.editableSavedTransection.Kibi_tid) {
          return state.editableSavedTransection;
        }
        return transection;
      });
      state.savedTransections = [...newTransections];
      state.editableSavedTransection = null;
    },
    updatePeriodEndDate: (state, action) => {
      state.periodEndDate = action.payload;
    },
    removePushedTransections: (state) => {
      const newTransections = state.transections.filter(
        (tr) => !tr.markReadyValue
      );
      state.transections = [...newTransections];
    },
    setEditableSavedTransection: (state, action) => {
      state.editableSavedTransection = action.payload;
    },
    removeEditableSavedTransection: (state) => {
      state.editableSavedTransection = null;
    },
    setQuickbooksBalance: (state, action) => {
      state.quickbooksBalance = action.payload;
    },
    setSavedTransections: (state, action) => {
      state.savedTransections = [...action.payload];
      let balance = 0;
      action.payload.map((item) => {
        balance += item.remainingExpense;
      });
      state.subledgerBalance = balance;
      //line, name
      let isPaid;
      const refinedData = action.payload.filter((transection) => {
        for (let i = 0; i < transection.totalMonths; i++) {
          if (monthYear === transection.amortizationWaterfall[i].monthYear)
            isPaid = transection.amortizationWaterfall[i].isPaid;
        }
        if (isPaid) return false;
        return true;
      });
      const newJournalEntries = refinedData.map((transection, index) => {
        for (let i = 0; i < transection.totalMonths; i++) {
          if (monthYear === transection.amortizationWaterfall[i].monthYear)
            isPaid = transection.amortizationWaterfall[i].isPaid;
        }
        if (isPaid) return;
        return {
          line: index + 1,
          name: transection.name,
          description: transection.description,
          expenseAccountValue: transection.expenseAccountValue,
          amount: transection.amount,
          currentPeriodExpense: transection.currentPeriodExpense,
        };
      });
      let maxMonths = -1;
      const newAmortizationWaterfall = action.payload.map(
        (transection, index) => {
          let newWaterfall = {};
          for (let i = 0; i < transection.totalMonths; i++) {
            const monthYearKey = transection.amortizationWaterfall[i].monthYear;
            newWaterfall[monthYearKey] =
              transection.amortizationWaterfall[i].expenseAmount;
          }
          console.log(newWaterfall);
          if (transection.remainingMonths > maxMonths) {
            maxMonths = transection.remainingMonths;
            state.waterfall = transection.amortizationWaterfall;
          }
          return {
            num: transection.num,
            name: transection.name,
            description: transection.description,
            expenseAccountValue: transection.expenseAccountValue,
            amortizationStartDateValue: transection.amortizationStartDateValue,
            amortizationEndDateValue: transection.amortizationEndDateValue,
            amount: transection.amount,
            expensedToDate: transection.expensedToDate,
            remainingExpanse: transection.remainingEspense,
            ...newWaterfall,
          };
        }
      );
      state.journalEntries = [...newJournalEntries];
      state.amortizationWaterfallEntries = [...newAmortizationWaterfall];
    },
  },
});

export const {
  setTransections,
  updateTransection,
  removePushedTransections,
  setSavedTransections,
  saveUpdatedTransection,
  updateSavedTransection,
  setEditableSavedTransection,
  setQuickbooksBalance,
  updatePeriodEndDate,
  removeEditableSavedTransection,
} = intuitSlice.actions;
export default intuitSlice.reducer;
