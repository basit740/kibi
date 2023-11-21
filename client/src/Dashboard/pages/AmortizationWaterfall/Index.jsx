import React, { useEffect } from "react";

import Container from "dashboard/components/Container";
import Table from "dashboard/components/Table";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTransectionsFromDb } from "services/intuit";
import { setSavedTransections } from "store/intuit";
const dates = [
  {
    value: "May 31, 2023",
    display: "May 31, 2023",
  },
];

const tableData1 = {
  Columns: [
    {
      field: "period",
      headerName: "Period",
      sortable: true,
    },

    { field: "download", headerName: "Download", sortable: true },
  ],
  Rows: [
    {
      period: "March 2023",
      download: <Link to="/download-excel">Download to Excel</Link>,
    },
    {
      period: "Januray 2023",
      download: <Link to="/download-excel">Download to Excel</Link>,
    },
    {
      period: "Feb 2023",
      download: <Link to="/download-excel">Download to Excel</Link>,
    },
  ],
};

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
  const waterfall = useSelector((state) => state.intuit.waterfall);
  const amortizationWaterfallEntries = useSelector(
    (state) => state.intuit.amortizationWaterfallEntries
  );
  const dispatch = useDispatch();

  let tableData;
  if (waterfall.length > 0) {
    tableData = {
      Columns: [
        {
          field: "num",
          headerName: "Num",
          sortable: true,
        },
        { field: "name", headerName: "Name", sortable: true },
        {
          field: "description",
          headerName: "Memo/Description",
          sortable: true,
        },
        {
          field: "expenseAccountValue",
          headerName: "Expense Account",
          sortable: true,
        },
        {
          field: "amortizationStartDateValue",
          headerName: "Amortization Start Date",
          sortable: true,
        },
        {
          field: "amortizationEndDateValue",
          headerName: "Amortization End Date",
          sortable: true,
        },
        {
          field: "amount",
          headerName: "Orignal Amount",
          sortable: true,
        },
        {
          field: "expensedToDate",
          headerName: "Expensed To Date",
          sortable: true,
        },
        {
          field: "remainingExpense",
          headerName: "Remaining",
          sortable: true,
        },
        ...waterfall.map((item) => {
          return {
            field: item.monthYear,
            headerName: item.monthYear,
            sortable: false,
          };
        }),
      ],
      Rows: amortizationWaterfallEntries,
    };
  } else {
    tableData = {
      Columns: [
        {
          field: "num",
          headerName: "Num",
          sortable: true,
        },
        { field: "name", headerName: "Name", sortable: true },
        {
          field: "description",
          headerName: "Memo/Description",
          sortable: true,
        },
        {
          field: "expenseAccountValue",
          headerName: "Expense Account",
          sortable: true,
        },
        {
          field: "amortizationStartDateValue",
          headerName: "Amortization Start Date",
          sortable: true,
        },
        {
          field: "amortizationEndDateValue",
          headerName: "Amortization End Date",
          sortable: true,
        },
        {
          field: "amount",
          headerName: "Orignal Amount",
          sortable: true,
        },
        {
          field: "expensedToDate",
          headerName: "Expensed To Date",
          sortable: true,
        },
        {
          field: "remainingExpense",
          headerName: "Remaining",
          sortable: true,
        },
      ],
      Rows: amortizationWaterfallEntries,
    };
  }
  useEffect(() => {
    (async () => {
      const savedTransections = await getTransectionsFromDb();
      if (savedTransections) {
        console.log(savedTransections);
        dispatch(setSavedTransections(savedTransections.data));
      }
    })();
  }, []);

  return (
    <Container>
      <Table
        title="Amortization Waterfall"
        scrollable={true}
        tableData={tableData}
      />

      <div className="w-40 mt-40">
        <Table title="Amortization Waterfall" tableData={tableData1} />
      </div>
    </Container>
  );
};

export default Index;
