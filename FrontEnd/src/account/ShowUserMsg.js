import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ShowUserMsg = ({setShowMsg}) => {

    const navigate = useNavigate();

  return (
    <div className='absolute bg-gray-300 bg-opacity-50 w-64' >
        <h1>Told to Plant</h1>
        <h1
        onClick={()=>{
            // navigate('/useractionpage');
        }}
        className='underline'
        >Details</h1>
        <h1
        onClick={()=>{
            setShowMsg(false)
        }}
        >Done</h1>
        
    </div>
  )
}

export default ShowUserMsg