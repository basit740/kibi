import React, { useState, useEffect } from "react";
import "./Dropdown.css";

const Dropdown = ({ id, name, data, value, displayName, handleChange }) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    setState(value);
  }, [value]);
  return (
    <div id={id}>
      <select
        id={id}
        className="dropdown"
        value={state}
        onChange={(e) => {
          setState(e.target.value);
          handleChange(id, name, e.target.value);
        }}
      >
        {data.map((option) => {
          //console.log(option)
          return (
            <option
              key={option[value]}
              className="dropdown__option"
              value={option[value]}
            >
              {option[displayName]}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
