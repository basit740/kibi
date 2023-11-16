// intuitSlice.js
import { createSlice } from "@reduxjs/toolkit";
function getCurrentDateFormatted() {
  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const intuitSlice = createSlice({
  name: "intuit",
  initialState: {
    periodEndDate: getCurrentDateFormatted(),
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
    setQuickbooksBalance: (state, action) => {
      state.quickbooksBalance = action.payload;
    },
    setSavedTransections: (state, action) => {
      state.savedTransections = [...action.payload];
      let balance = 0;
      action.payload.map((item) => {
        balance += item.amount;
      });
      state.subledgerBalance = balance;
      //line, name
      const newJournalEntries = action.payload.map((transection, index) => {
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
          for (let i = 0; i < transection.remainingMonths; i++) {
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
} = intuitSlice.actions;
export default intuitSlice.reducer;
