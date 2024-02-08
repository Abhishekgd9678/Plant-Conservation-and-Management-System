import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAdmin } from './store/adminSlice';

const AdminLogin = () => {

    const loggedIn = useSelector(store=>store.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if(loggedIn){
        navigate('/adminprofile');
        return ;
    }

    const [username,setUserName] = useState();
    const [mail,setMail] = useState();
    const [pass,setPass] = useState();
    
    const handlePress = async ()=>{
            const res =await axios.post("http://localhost:3000/adminlog",{
                mail:mail,
                password:pass
            });
            if(res.data){
                // dispatch(addUser(res.data[0]))
                dispatch(addAdmin({email:mail,password:pass}))
                navigate('/adminprofile');
            }
            else{
                alert(res.data.error);
            }
    }

  return (
    <div className='flex justify-center items-center h-screen w-full p-2' >
        <div className='h-96 w-96 flex flex-col gap-6 shadow-lg bg-gray-300 rounded-lg p-4' >
                    <h3 className='text-2xl'>Login</h3>

            <form id="signupForm" className='flex flex-col gap-4 p-2'>
                <label >Email:</label>
                <input 
                onChange={(e)=>{
                    setMail(e.target.value);
                }}
                type="email" className='border-gray-300 border-opacity-90 border rounded-lg p-1' name="mail" required />

                <label>Password:</label>
                <input 
                onChange={(e)=>{
                    setPass(e.target.value);
                }}
                type="password" className='border-gray-300 border-opacity-90 border rounded-lg p-1' name="pass" required />

                <button 
                onClick={()=>{
                    handlePress();
                }}
                className='p-1 my-3 bg-blue-400 rounded-lg' type="button">Login</button>
            </form>
        </div>
    </div>
  )
}

export default AdminLogin;