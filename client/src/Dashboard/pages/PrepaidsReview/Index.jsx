import React, { useEffect, useState } from "react";
import Container from "dashboard/components/Container";
import Card from "dashboard/components/UI/Card";
import PeriodsEndDate from "dashboard/components/PeriodsEndDate";
import Total from "dashboard/components/Total";
import Table from "dashboard/components/Table";
import Button from "dashboard/components/Button";
import Dropdown from "dashboard/components/Dropdown";
import DatePicker from "dashboard/components/DatePicker";
import CustomCbx from "dashboard/components/CustomCbx";
import { useDispatch, useSelector } from "react-redux";
import {
  removePushedTransections,
  saveUpdatedTransection,
  setSavedTransections,
  setTransections,
  updateSavedTransection,
  setEditableSavedTransection,
  updateTransection,
  setQuickbooksBalance,
  removeEditableSavedTransection,
} from "store/intuit";
import {
  getTransections,
  saveTransections,
  getTransectionsFromDb,
  getQuickbooksBalance,
  updateTransectionOnDb,
} from "services/intuit";

const dates = [
  {
    value: "May 31, 2023",
    display: "May 31, 2023",
  },
];

const Index = () => {
  const transections = useSelector((state) => state.intuit.transections);
  const savedTransections = useSelector(
    (state) => state.intuit.savedTransections
  );
  const [accounts, setAccounts] = useState([]);
  const quickbooksBalance = useSelector(
    (state) => state.intuit.quickbooksBalance
  );
  const subledgerBalance = useSelector(
    (state) => state.intuit.subledgerBalance
  );
  const [editingTransection, setEditingTransection] = useState(null);
  const dispatch = useDispatch();
  const [rows, setRows] = useState();
  const [selectedAccount, setSelectedAccount] = useState();
  const editableSavedTransection = useSelector(
    (state) => state.intuit.editableSavedTransection
  );
  const fetchQuickbookAccounts = async () => {
    try {
      const companyId = localStorage.getItem("companyId");
      const response = await fetch(
        import.meta.env.VITE_API_URL +
          "/available-account-details?companyId=" +
          companyId
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // Use the functional form of setState to ensure you're using the latest state
      const newAccounts = data.data;
      setAccounts(newAccounts);
      setSelectedAccount(newAccounts[0]);
      return newAccounts[0];
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleUpdateTransection = (id, name, value) => {
    const payload = {
      id: id,
      value: value, //yyyy-mm-dd
      name: name,
    };
    dispatch(updateTransection(payload));
  };
  const handleUpdateSavedTransection = (id, name, value) => {
    const payload = {
      id: id,
      value: value,
      name: name,
    };
    dispatch(updateSavedTransection(payload));
  };

  const handleEditClick = (transection) => {
    dispatch(setEditableSavedTransection(transection));
  };

  const handleUpdateMarkReady = (data) => {
    const { id, state, setState } = data;
    const payload = {
      id: id,
      value: !state,
      name: "markReady",
    };
    setState(!state);
    dispatch(updateTransection(payload));
  };
  useEffect(() => {
    if (transections) {
      const newRows = transections.map((transection) => {
        return {
          ...transection,
          amortizationStartDate: (
            <DatePicker
              id={transection.tid}
              key={transection.tid}
              name={"amortizationStartDate"}
              handleChange={handleUpdateTransection}
            />
          ),
          amortizationEndDate: (
            <DatePicker
              id={transection.tid}
              key={transection.tid}
              name={"amortizationEndDate"}
              handleChange={handleUpdateTransection}
            />
          ),
          expenseAccount: (
            <Dropdown
              data={accounts}
              id={transection.tid}
              key={transection.tid}
              name={"expenseAccount"}
              value={"AccountName"}
              displayName={"AccountName"}
              handleChange={handleUpdateTransection}
            />
          ),
          markReady: (
            <CustomCbx
              _id={transection.id}
              key={transection.tid}
              id={transection.tid}
              value={transection.markReady || false}
              handleChange={handleUpdateMarkReady}
            />
          ),
        };
      });
      setRows(newRows);
    }
  }, [transections]);
  const handlePrepare4Jentry = async (e) => {
    const newTransections = transections.filter((tr) => tr.markReadyValue);
    const companyId = localStorage.getItem("companyId");
    const userId = localStorage.getItem("userId");
    window.alert(newTransections);
    const body = {
      transactions: newTransections,
      companyId: companyId,
      userId: userId,
    };
    dispatch(removePushedTransections());
    const savetransections = await saveTransections(body);
    const response = await getTransectionsFromDb();
    console.log(response.data);
    dispatch(setSavedTransections(response.data));
  };
  const handleSave = (row) => {
    dispatch(saveUpdatedTransection());
    updateTransectionOnDb({
      transactionId: { Kibi_tid: editableSavedTransection.Kibi_tid },
      updatedData: editableSavedTransection,
    });
    setEditingTransection(null);
  };

  const handleCancelEdit = () => {
    dispatch(removeEditableSavedTransection());
  };
  useEffect(() => {
    (async () => {
      const response = await getQuickbooksBalance();
      dispatch(setQuickbooksBalance(response.data));
    })();
  }, []);
  const date = useSelector((state) => state.intuit.periodEndDate);

  useEffect(() => {
    (async () => {
      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = newDate.getMonth() + 1;
      const [account, response] = await Promise.all([
        fetchQuickbookAccounts(),
        getTransections(month, year),
      ]);
      if (response) {
        console.log(response);
        const someNewTransections = response.data?.map((tr) => {
          return {
            ...tr,
            expenseAccountValue: account?.AccountName,
          };
        });
        dispatch(setTransections(someNewTransections));
      }
    })();
  }, [date]);

  useEffect(() => {
    (async () => {
      const savedTransections = await getTransectionsFromDb();
      if (savedTransections) {
        console.log(savedTransections);
        dispatch(setSavedTransections(savedTransections.data));
      }
    })();
  }, []);

  const updateSelectedAccount = (e) => {
    console.log(e.target.value);
    const newSelectedAccount = accounts.find(
      (a) => a.AccountName === e.target.value
    );
    setSelectedAccount(newSelectedAccount);
  };

  const tableData = {
    Columns: [
      {
        field: "transectionType",
        headerName: "Transaction Type",
        sortable: true,
      },
      {
        field: "num",
        headerName: "Num",
        sortable: true,
      },
      { field: "name", headerName: "Name", sortable: true },
      { field: "memo", headerName: "Memo/Description", sortable: true },
      {
        field: "expenseAccount",
        headerName: "Expense Account",
        sortable: true,
      },
      {
        field: "amount",
        headerName: "Amount",
        sortable: true,
      },
      {
        field: "amortizationStartDate",
        headerName: "Amortization Start Date",
        sortable: true,
      },
      {
        field: "amortizationEndDate",
        headerName: "Amortization End Date",
        sortable: true,
      },
      {
        field: "markReady",
        headerName: "Mark Ready",
        sortable: true,
      },
    ],
    Rows: rows,
  };
  const tableData2 = {
    Columns: [
      {
        field: "transectionType",
        headerName: "Transaction Type",
        sortable: true,
      },
      {
        field: "num",
        headerName: "Num",
        sortable: true,
      },
      { field: "name", headerName: "Name", sortable: true },
      { field: "memo", headerName: "Memo/Description", sortable: true },
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
        field: "amortizationStartDateValue",
        headerName: "Amortization Start Date",
        renderCell: (row) =>
          row.Kibi_tid === editableSavedTransection?.Kibi_tid ? (
            <DatePicker
              id={row.tid}
              key={row.tid}
              name="amortizationStartDate"
              handleChange={handleUpdateSavedTransection}
              value={editableSavedTransection?.amortizationStartDateValue}
            />
          ) : (
            row.amortizationStartDateValue
          ),
      },
      {
        field: "amortizationEndDateValue",
        headerName: "Amortization End Date",
        renderCell: (row) =>
          row.Kibi_tid === editableSavedTransection?.Kibi_tid ? (
            <DatePicker
              id={row.tid}
              name="amortizationEndDate"
              key={row.tid}
              handleChange={handleUpdateSavedTransection}
              value={editableSavedTransection?.amortizationEndDateValue}
            />
          ) : (
            row.amortizationEndDateValue
          ),
      },
      {
        field: "expenseAccountValue",
        headerName: "Expense Account",
        renderCell: (row) =>
          row.Kibi_tid === editableSavedTransection?.Kibi_tid ? (
            <Dropdown
              data={accounts}
              id={row.tid}
              key={row.tid}
              name="expenseAccount"
              value={editableSavedTransection?.expenseAccountValue}
              displayName="AccountName"
              handleChange={handleUpdateSavedTransection}
            />
          ) : (
            row.expenseAccountValue
          ),
      },
      {
        field: "edit",
        headerName: "Edit",
        renderCell: (row) =>
          row.Kibi_tid === editableSavedTransection?.Kibi_tid ? (
            <>
              <Button
                key={row.tid}
                title="Save"
                onClick={() => handleSave(row)}
              />
              <Button key={row.tid} title="Cancel" onClick={handleCancelEdit} />
            </>
          ) : (
            <Button
              key={row.tid}
              title="Edit"
              onClick={() => handleEditClick(row)}
            />
          ),
      },
      // ... other columns ...
    ],
    Rows: savedTransections.map((transection) => ({
      ...transection,
      amortizationStartDateValue: transection.amortizationStartDateValue,
      amortizationEndDateValue: transection.amortizationEndDateValue,
      expenseAccountValue: transection.expenseAccountValue,
    })),
  };

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
      {rows && (
        <Table
          title="Prepaids Review"
          scrollable={true}
          tableData={tableData}
        />
      )}
      <div className="flex just-end mt-32">
        <Button
          title="Prepare of Journal Entry"
          onClick={handlePrepare4Jentry}
        />
      </div>{" "}
      {savedTransections.length > 0 && (
        <Table title="Subledger" scrollable={true} tableData={tableData2} />
      )}
    </Container>
  );
};

export default Index;
