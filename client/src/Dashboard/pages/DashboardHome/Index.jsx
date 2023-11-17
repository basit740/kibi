import React, { useEffect, useState } from "react";
import Container from "dashboard/components/Container";

import WelcomeBanner from "dashboard/components/WelcomeBanner";
import Table from "dashboard/components/Table";
import Loader from "dashboard/components/Loader";

// services
import { getUserInfoIntuit, getUserInfo } from "services/intuit";
const items = 92;
const bannerContent = {
  title: "Welcome to Robert Fox!",
  items: items,
};
import { getIntuitAuthUri } from "services/intuit";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const tableData = {
  Columns: {
    Column: [
      {
        field: "subledgerBalance",
        headerName: "Subledger Balance",
        sortable: false,
      },
      {
        field: "quickbooksBalance",
        headerName: "Quickbooks Balance",
        sortable: false,
      },
      { field: "variance", headerName: "Variance", sortable: false },
    ],
  },
  rows: [
    {
      subledgerBalance: "$54,365.58",
      quickbooksBalance: "$120,000.00",
      variance: "($65,634.42)",
    },
  ],
};

const Index = () => {
  //getUserInfoIntuit
  const navigate = useNavigate();
  
  const [intuitLoading, setIntuitLoading] = useState(false);
  // const [returnedUUID, setReturnedUUID] = useState('');
  return (
    <Container>
      <WelcomeBanner title={bannerContent.title}>
        <span>
          You have <span>{items}</span> new prepaid items to Review
        </span>
      </WelcomeBanner>
      {/* <div className='w-70'>
				<Table tableData={tableData} title='Reconciliation Overview' />
			</div> */}
    </Container>
  );
};

export default Index;
