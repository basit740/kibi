import React, { useEffect, useState } from "react";
import "../../../styling/Dashboard/components/CustomCbx.css";
import Switch from "./Switch";

const CustomCbx = ({ id, name, _id, value, handleChange }) => {
  const switchId = "id-" + id;
  //console.log('value', value)
  const [checked, setChecked] = useState(value);
  //console.log(switchId,checked)
  useEffect(() => {
    if (value !== checked) {
      setChecked(value);
    }
  }, [value]);

  return (
    <div id={id} className={`custom_cbx ${checked ? "checked" : ""}`}>
      <input
        type="checkbox"
        value={checked}
        className={`custom_cbx__checkbox`}
        id={switchId}
        onChange={(e) =>
          handleChange({
            event: e,
            state: checked,
            id: id,
            setState: setChecked,
            name: name,
            _id: _id,
          })
        }
      />
      <label htmlFor={switchId} className="custom_cbx__label">
        {checked ? "No" : "Yes"}
        <Switch />
      </label>
    </div>
  );
};

export default CustomCbx;
