import React from "react";

import styles from "styling/Dashboard/components/PeriodsEndDate.module.css";
import DatePicker from "../DatePicker";
const PeriodsEndDate = ({ dates }) => {
  return (
    <div className={`flex align-center gap-4 ${styles.periods_end_date}`}>
      <h4 className={styles.periods_end_date__title}>Period End Date</h4>
      <DatePicker name="period-end-date" id="period-end-date" />
    </div>
  );
};

export default PeriodsEndDate;
