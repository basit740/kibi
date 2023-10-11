import React from 'react'
import './Dropdown.css';

const Dropdown = ({data, value, displayName}) => {
  return (
    <div>
      <select className='dropdown'>
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
