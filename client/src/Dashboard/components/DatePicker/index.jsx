import React, { useEffect, useState } from "react";
import "styling/Dashboard/components/DatePicker.css";

const DatePicker = ({ id, name, value, handleChange }) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    setState(value);
  }, [value]);
  return (
    <div className="date_picker" id={id}>
      <input
        type="date"
        id={id}
        value={state}
        className="date_picker__input"
        onChange={(e) => {
          setState(e.target.value);
          handleChange(id, name, e.target.value);
        }}
      />
    </div>
  );
};

export default DatePicker;
