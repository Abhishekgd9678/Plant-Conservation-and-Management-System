import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from './store/userdata';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login,setLogin] = useState(true);

    const [username,setUserName] = useState();
    const [mail,setMail] = useState();
    const [pass,setPass] = useState();
    
    const handlePress = async ()=>{
        if(login){
            const res =await axios.post("http://localhost:3000/login",{
                mail:mail,
                password:pass
            });
            if(res.data){
                dispatch(addUser(res.data[0]))
                navigate('/account');
            }
            else{
                alert(res.data);
            }
        }
        else{
            const res =await axios.post("http://localhost:3000/signup",{
                name:username,
                mail:mail,
                password:pass
            });
            if(res.data){
                // dispatch(addUser(res.data[0]))
                dispatch(addUser({username:username,email:mail,password:pass,userid:res.data.insertId}))
                navigate('/account');
            }
            else{
                alert(res.data);
            }
        }
    }

  return (
    <div className='flex justify-center items-center h-screen w-full p-2' >
        <div className='h-96 w-96 flex flex-col gap-6 shadow-lg bg-gray-300 rounded-lg p-4' >

                {login?
                    <h3 className='text-2xl'>Login</h3>
                    :
                    <h3 className='text-2xl'>Sign Up</h3>
                }
            <form id="signupForm" className='flex flex-col gap-4 p-2'>

                {!login && <><label >Username:</label>
                <input
                onChange={(e)=>{
                    setUserName(e.target.value);
                }}
                type="text" className='border-gray-300 border-opacity-90 border rounded-lg p-1' name="name" required /> </>}

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
                className='p-1 my-3 bg-blue-400 rounded-lg' type="button">{login?"Login" : "Sign Up"}</button>


                {login ?
                    <div>
                        <p>New to PCMS? </p><p 
                        className='cursor-pointer'
                        onClick={()=>{
                            setLogin(false);
                        }}
                        >Sign Up</p>
                    </div>
                    :
                    <div>
                        <p>Already a user </p><p 
                        className='cursor-pointer'
                        onClick={()=>{
                            setLogin(true);
                        }}
                        >Login</p>
                    </div>
                }
            </form>
        </div>
    </div>
  )
}

export default Login