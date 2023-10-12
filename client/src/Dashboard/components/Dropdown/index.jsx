import React from 'react'
import './Dropdown.css';

const Dropdown = ({data, value, displayName, handleChange}) => {
  return (
    <div>
      <select className='dropdown' onChange={handleChange}>
        {
            data.map((option)=> {
              console.log(option)
              return (
                <option key={option[value]} className='dropdown__option' value={option[value]}>
                    {option[displayName]}
                </option>
               )
            })

        }
      </select>
    </div>
  )
}

export default Dropdown
