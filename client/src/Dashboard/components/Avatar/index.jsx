import React from 'react'
import './Avatar.css';
const Avatar = ({name}) => {
    const letter = name.charAt(0).toUpperCase();
  return (
    <div className='circle fs-20 avatar'>
      {letter}
    </div>
  )
}

export default Avatar
