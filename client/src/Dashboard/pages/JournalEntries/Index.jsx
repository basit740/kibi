import React, { useEffect } from "react";
import Container from "dashboard/components/Container";

import Button from "dashboard/components/Button";
import Card from "dashboard/components/UI/Card";
import PeriodsEndDate from "dashboard/components/PeriodsEndDate";
import Total from "dashboard/components/Total";
import Table from "dashboard/components/Table";

import JournalEntry from "dashboard/components/JournalEntry";
import { useSelector, useDispatch } from "react-redux";
import {
  getQuickbooksBalance,
  getTransectionsFromDb,
  postJournalEntry,
} from "services/intuit";
import { setQuickbooksBalance, setSavedTransections } from "store/intuit";
const dates = [
  {
    value: "May 31, 2023",
    display: "May 31, 2023",
  },
];

const items = [
  {
    title: "Period",
    data: "March 2023",
  },
  {
    title: "Total Amortization Expense",
    data: 11000,
  },
];
const Index = () => {
  const journalEntries = useSelector((state) => state.intuit.journalEntries);
  const handlePost2QB = async (e) => {
    let amount = 0;
    let lines = journalEntries.map((entry, index) => {
      amount += entry.currentPeriodExpense;
      return {
        Id: index + 1,
        Description: "Description",
        Amount: entry.currentPeriodExpense,
        DetailType: "JournalEntryLineDetail",
        JournalEntryLineDetail: {
          PostingType: "Credit",
          AccountRef: {
            value: entry.expenseAccountValue, // Replace with actual Account ID
          },
        },
      };
    });
    lines = [
      ...lines,
      {
        Id: lines.length,
        Description: "Description",
        Amount: amount,
        DetailType: "JournalEntryLineDetail",
        JournalEntryLineDetail: {
          PostingType: "Debit",
          AccountRef: {
            value: "Prepaid Expenses", // Replace with actual Account ID
          },
        },
      },
    ];
    const body = { Line: lines };
    const response = await postJournalEntry(body);
    console.log(response.data);
  };
  const handleDownload = (e) => {};
  const dispatch = useDispatch();
  const quickbooksBalance = useSelector(
    (state) => state.intuit.quickbooksBalance
  );
  const subledgerBalance = useSelector(
    (state) => state.intuit.subledgerBalance
  );
  const tableData = {
    Columns: [
      {
        field: "line",
        headerName: "Line",
        sortable: true,
      },
      { field: "name", headerName: "Name", sortable: true },
      { field: "description", headerName: "Memo/Description", sortable: true },
      {
        field: "expenseAccountValue",
        headerName: "Expense Account",
        sortable: true,
      },
      {
        field: "amount",
        headerName: "Amount",
        sortable: true,
      },
      {
        field: "currentPeriodExpense",
        headerName: "Current Period Expense",
        sortable: true,
      },
    ],
    Rows: journalEntries,
  };
  useEffect(() => {
    (async () => {
      const savedTransections = await getTransectionsFromDb();
      if (savedTransections) {
        console.log(savedTransections);
        dispatch(setSavedTransections(savedTransections.data));
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const response = await getQuickbooksBalance();
      dispatch(setQuickbooksBalance(response.data));
    })();
  }, []);
  return (
    <Container>
      <div className="grid grid-4 gap-24 mt-32 mb-32">
        <Card>
          <PeriodsEndDate dates={dates} />
        </Card>
        <Card>
          <Total title="Subledger Balance" amount={subledgerBalance} />
        </Card>
        <Card>
          <Total title="QuickBooks Balance" amount={quickbooksBalance} />
        </Card>
        <Card>
          <Total
            title="Variance"
            amount={Math.abs(quickbooksBalance - subledgerBalance)}
          />
        </Card>
      </div>

      {/* BUTTON ACTIONS */}
      <div className="flex just-end">
        <div className="flex gap-8">
          <Button
            title="Post to quickbooks"
            variant="outlined"
            onClick={handlePost2QB}
          />
          <Button title="Download" variant="fill" onClick={handleDownload} />
        </div>
      </div>
      {journalEntries.length > 0 && (
        <Table
          title="Journal Entries"
          scrollable={true}
          tableData={tableData}
        />
      )}

      <h2 className="section_heading mt-32 mb-32">
        Historical Journal Entries
      </h2>

      <div className="flex gap-24 scrollable">
        <JournalEntry items={items} />
        <JournalEntry items={items} />
        <JournalEntry items={items} />
        <JournalEntry items={items} />
        <JournalEntry items={items} />
        <JournalEntry items={items} />
        <JournalEntry items={items} />
        <JournalEntry items={items} />
        <JournalEntry items={items} />
      </div>
    </Container>
  );
};

export default Index;
