import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const ShowMsg = ({userid,plantid,setShowMsg}) => {

    const navigate = useNavigate();

  return (
    <div className='bg-gray-300 bg-opacity-50 w-64' >
        <h1>Report of Reduction of Trees</h1>
        <h1
        onClick={()=>{
            navigate('/actionpage');
        }}
        className='underline'
        >Details</h1>
        <div>
            <h1
            onClick={()=>{
                setShowMsg(false)
            }}
            >Done</h1>
        </div>
    </div>
  )
}

export default ShowMsg