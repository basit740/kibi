import React from "react";

import styles from "styling/Dashboard/components/PeriodsEndDate.module.css";
import DatePicker from "../DatePicker";
import { useDispatch, useSelector } from "react-redux";
import { updatePeriodEndDate } from "store/intuit";
const PeriodsEndDate = ({ dates }) => {
  const date = useSelector((state) => state.intuit.periodEndDate);
  const dispatch = useDispatch();
  const handleChange = (id, name, value) => {
    dispatch(updatePeriodEndDate(value));
  };
  return (
    <div className={`flex align-center gap-4 ${styles.periods_end_date}`}>
      <h4 className={styles.periods_end_date__title}>Period End Date</h4>
      <DatePicker
        name="period-end-date"
        id="period-end-date"
        value={date}
        handleChange={handleChange}
      />
    </div>
  );
};

export default PeriodsEndDate;
