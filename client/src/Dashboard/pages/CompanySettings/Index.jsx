import React, { useEffect, useState } from "react";
import Container from "dashboard/components/Container";

import Loader from "dashboard/components/Loader";
import Table from "dashboard/components/Table";
import CustomCbx from "dashboard/components/CustomCbx";
import { Link } from "react-router-dom";
import Dropdown from "dashboard/components/Dropdown";

import {
  useUpdateAccountStatusMutation,
  useChangeAllAccountsAvailabilityStatusMutation,
  useGetAccountsQuery,
  useGetSelectAllAccountsValueQuery,
} from "store/api/apiSlice";
import { getClasses, getLocations } from "services/intuit";

const tableData2 = {
  Columns: [
    { field: "accountName", headerName: "Account Name", sortable: false },
    {
      field: "availableForSelection",
      headerName: "Available for Selection",
      sortable: false,
    },
  ],
  Rows: [
    {
      accountName: "Finance",
      availableForSelection: <CustomCbx id="11" />,
    },
    {
      accountName: "Operations",
      availableForSelection: <CustomCbx id="22" />,
    },
    {
      accountName: "Legal",
      availableForSelection: <CustomCbx id="33" />,
    },
  ],
};

const tableData3 = {
  Columns: [
    { field: "accountName", headerName: "Account Name", sortable: false },
    {
      field: "availableForSelection",
      headerName: "Available for Selection",
      sortable: false,
    },
  ],
  Rows: [
    {
      accountName: "Finance",
      availableForSelection: <CustomCbx id="111" />,
    },
    {
      accountName: "Operations",
      availableForSelection: <CustomCbx id="222" />,
    },
    {
      accountName: "Legal",
      availableForSelection: <CustomCbx id="333" />,
    },
  ],
};

const Index = () => {
  const companyId = localStorage.getItem("companyId");
  const { data: accounts = [], isLoading: accountsLoading } =
    useGetAccountsQuery(companyId);
  const { data: selectAllValu, isLoading: selectAllValueLoading } =
    useGetSelectAllAccountsValueQuery();
  const [updateAccountStatus, result] = useUpdateAccountStatusMutation();
  const [
    changeAllAccountsAvailabilityStatus,
    { result: changeAllAccountsAvailabilityStatusResponse },
  ] = useChangeAllAccountsAvailabilityStatusMutation();
  const [quickbookaccounts, setQuickbookAccounts] = useState();
  const subledgerAccounts = accounts.filter((row) =>
    row.DetailType === "Prepaid Expenses" ? true : false
  );

  const handleStatusChange = async (payload) => {
    const { event, state, setState, _id } = payload;
    console.log(event.target.value);
    setState(!state);
    const newRows = quickbookaccounts.Rows.map((row) => {
      if (row._id === _id) {
        return { ...row, Kibi_AvailableForSelection: !state };
      }
      return row;
    });
    const switchEnable = newRows.filter(
      (row) => row.Kibi_AvailableForSelection == false
    );
    console.log(switchEnable);
    setQuickbookAccounts((prev) => ({
      ...prev,
      Rows: [...newRows],
      Columns: [
        {
          field: "AccountNumber",
          headerName: "Account Number",
          sortable: false,
        },
        {
          field: "AccountName",
          headerName: "Account Name",
          sortable: false,
        },
        {
          field: "Kibi_AvailableForSelection",
          headerName: (
            <span className="flex just-between">
              Available for Selection
              <CustomCbx
                _id={"abc"}
                id="account_settings"
                value={switchEnable.length == 0 ? true : false}
                handleChange={handleSelectAllChange}
              />
            </span>
          ),
          sortable: false,
        },
      ],
    }));
    await updateAccountStatus({ value: !state, id: _id })
      .then()
      .catch((error) => {
        setState(state);
      });
  };
  const handleSelectAllChange = async (payload) => {
    const { event, state, setState } = payload;
    setQuickbookAccounts((prev) => {
      const newquickbookaccounts = prev.Rows.map((account) => {
        return { ...account, Kibi_AvailableForSelection: !state };
      });
      return {
        ...prev,
        Rows: [...newquickbookaccounts],
        Columns: [
          {
            field: "AccountNumber",
            headerName: "Account Number",
            sortable: false,
          },
          {
            field: "AccountName",
            headerName: "Account Name",
            sortable: false,
          },
          {
            field: "Kibi_AvailableForSelection",
            headerName: (
              <span className="flex just-between">
                Available for Selection
                <CustomCbx
                  _id={"abc"}
                  id="account_settings"
                  value={!state}
                  handleChange={handleSelectAllChange}
                />
              </span>
            ),
            sortable: false,
          },
        ],
      };
    });
    setState(!state);
    await changeAllAccountsAvailabilityStatus({ value: !state })
      .then()
      .catch((error) => {
        setState(state);
      });
  };
  const AddCustomBoxComp = (accounts) => {
    const result = accounts.Rows.map((row) => {
      const newRow = {
        ...row,
        Kibi_AvailableForSelection: (
          <CustomCbx
            _id={row._id}
            id={row.AccountName}
            value={row.Kibi_AvailableForSelection}
            handleChange={handleStatusChange}
          />
        ),
      };
      return newRow;
    });
    return {
      ...accounts,
      Rows: result,
    };
  };

  useEffect(() => {
    if (accounts.length > 0) {
      setQuickbookAccounts((prev) => ({
        ...prev,
        Rows: [...accounts],
        Columns: [
          {
            field: "AccountNumber",
            headerName: "Account Number",
            sortable: false,
          },
          {
            field: "AccountName",
            headerName: "Account Name",
            sortable: false,
          },
          {
            field: "Kibi_AvailableForSelection",
            headerName: (
              <span className="flex just-between">
                Available for Selection
                <CustomCbx
                  _id={"abc"}
                  id="account_settings"
                  value={selectAllValu}
                  handleChange={handleSelectAllChange}
                />
              </span>
            ),
            sortable: false,
          },
        ],
      }));
    }
  }, [accounts]);

  useEffect(() => {
    (async () => {
      const classes = await getClasses();
      const locations = await getLocations();
      console.log(classes, locations);
    })();
  }, []);
  const tableData = {
    Columns: [
      { field: "accountNumber", headerName: "Account Number", sortable: false },
      { field: "accountName", headerName: "Account Name", sortable: false },
      {
        field: "amortizationFrequency",
        headerName: "Amortization Frequency",
        sortable: false,
      },
      { field: "actions", headerName: "Actions", sortable: false },
    ],
    Rows: [
      {
        accountNumber: "13000",
        accountName: (
          <Dropdown
            data={subledgerAccounts}
            value="AccountName"
            displayName="AccountName"
          />
        ),
        amortizationFrequency: "Monthly",
        actions: (
          <Link to="/dashboard/company-settings">
            Configure Beginner Subledger
          </Link>
        ),
      },
    ],
  };

  return (
    <Container>
      <Table title="Subledger" tableData={tableData} />
      {quickbookaccounts ? (
        <div className="w-70 mt-32">
          <Table
            title="Quickbooks Accounts"
            tableData={AddCustomBoxComp(quickbookaccounts)}
          />
        </div>
      ) : (
        <Loader size="lg" />
      )}
      <div className="grid grid-2 gap-30 mt-32">
        <Table title="QuickBooks Class" tableData={tableData2} />
        <Table title="QuickBooks Location" tableData={tableData3} />
      </div>
    </Container>
  );
};

export default Index;
