import axios from 'axios';
import React, { useEffect } from 'react'

import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate();
    const userpresent = useSelector(store=>store.user);
  
    useEffect(()=>{
      if(!userpresent){
        navigate('/log');
      }
      getData();
    })

    const getData =async ()=>{
        const res= await axios.post("http://localhost:3000/userplants");
        console.log(res);
    }
  
  return (
    <div>
        <div>
            <Link to='/contribute' >
                <h1 className='bg-blue-300 rounded-md'>
                    Add Plants
                </h1>
            </Link>
        </div>
    </div>
  )
}

export default Profile