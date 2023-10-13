import React from 'react'
import './Loader.css'
const index = ({size}) => {
    return (
        <div className={`lds-dual-ring ${size}`}></div>
    )
}

export default index
