import React, { useState } from 'react'

const Login = () => {
  const [login,setLogin] = useState(false);
  return (
    <div>
          {
            login?
            <h3>login</h3>:
            <h3>SignUp</h3>
          }
        <form id="signupForm" className='flex flex-col'> 
            <label>Username:</label>
            <input type="text" id="signupUsername" name="signupUsername" required />

            <label>Email:</label>
            <input type="email" id="signupEmail" name="signupEmail" required />

            <label >Password:</label>
            <input type="password" id="signupPassword" name="signupPassword" required />

            <button type="button">Sign Up</button>
            {login && <div>
              <h1>Already a user?</h1><h1 
              className='cursor-pointer'
              onClick={()=>{
                setLogin(false);
              }} >login</h1>
            </div>}
            {!login && <div>
              <h1>Not a user?</h1><h1
              className='cursor-pointer'
              onClick={()=>{
                setLogin(true);
              }} >Sign Up</h1>
            </div>} 
        </form>
    </div>
  )
}

export default Login