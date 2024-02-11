import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UserAction = () => {
  const navigate = useNavigate();
  const data = useSelector(store=>store.user);
  const [msg,setMsg] = useState();
  useEffect(()=>{
    getdata();
  },[]);

  const getdata =async (x,y)=>{
    const response = await axios.post("http://localhost:3000/getuserplantdata",{
        userid:data?.userid,
        plantid:data?.plantid,
    });
    console.log(response);
    setMsg(response?.data?.plantInfo[0]);
}
  return (
    <div className='flex flex-col m-10 gap-6'>
      <div className='text-2xl font-bold' >Message</div>
      <div className='font-semibold'>
        You need to plant {data?.needtoplant} trees of the species "{msg?.plantinfo_scientificname}" in order to increase the count.    
      </div>
      <div>
        <button
        className='bg-blue-300 m-1 p-1 rounded-md'
        onClick={()=>{
          navigate('/account');
        }}
        >
          back
        </button>
      </div>
    </div>
  )
}

export default UserAction