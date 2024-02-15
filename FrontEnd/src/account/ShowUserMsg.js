import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ShowUserMsg = ({setShowMsg}) => {

    const navigate = useNavigate();

  return (
    <div className='absolute top-10 -left-28 bg-gray-300 bg-opacity-50 w-auto' >
        <h1>You have a message</h1>       
    </div>
  )
}

export default ShowUserMsg