import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUser } from './store/userdata';
import background from "../images/outline.jpg"; // Background image

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, setLogin] = useState(true);
    const [username, setUserName] = useState();
    const [mail, setMail] = useState();
    const [pass, setPass] = useState();

    const handlePress = async () => {
        if (login) {
            const res = await axios.post("http://localhost:3000/login", {
                mail: mail,
                password: pass
            });
            if (!res?.data?.failed) {
                dispatch(addUser(res.data[0]))
                navigate('/account');
            } else {
                alert("Invalid Email or Password");
            }
        } else {
            const res = await axios.post("http://localhost:3000/signup", {
                name: username,
                mail: mail,
                password: pass
            });
            if (res.data) {
                dispatch(addUser({ username: username, email: mail, password: pass, userid: res.data.insertId }))
                navigate('/account');
            } else {
                alert(res.data);
            }
        }
    }

    return (
        <div className='flex justify-center items-center h-screen w-full p-2' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className='h-auto w-96 flex flex-col gap-6 border border-black shadow-lg rounded-lg p-4 bg-opacity-80'>
                {login ?
                    <h3 className='text-2xl'>Login</h3>
                    :
                    <h3 className='text-2xl'>Sign Up</h3>
                }
                <form id="signupForm" className='flex flex-col gap-4 p-2'>
                    {!login && <>
                        <label >Username:</label>
                        <input
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                            type="text"  name="name" required /> </>}
                    <label >Email:</label>
                    <input
                        onChange={(e) => {
                            setMail(e.target.value);
                        }}
                        type="email" className='border-gray-300 border-opacity-90 border rounded-lg p-1' name="mail" required />
                    <label>Password:</label>
                    <input
                        onChange={(e) => {
                            setPass(e.target.value);
                        }}
                        type="password" className='border-gray-300 border-opacity-90 border rounded-lg p-1' name="pass" required />
                    <button
                        onClick={() => {
                            handlePress();
                        }}
                        className='p-1 my-3 bg-gray-800  text-white rounded-lg' type="button">{login ? "Login" : "Sign Up"}</button>
                    {login ?
                        <div>
                            <p>New to PCMS? </p><p
                                className='cursor-pointer'
                                onClick={() => {
                                    setLogin(false);
                                }}
                            >Sign Up</p>
                        </div>
                        :
                        <div>
                            <p>Already a user </p><p
                                className='cursor-pointer'
                                onClick={() => {
                                    setLogin(true);
                                }}
                            >Login</p>
                        </div>
                    }
                    <div
                        onClick={() => {
                            navigate('/adminlog');
                        }}
                    >
                        <h1 className='text-lg bg-green-800 text-white w-32 rounded-md px-2' >Admin Login</h1>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;
