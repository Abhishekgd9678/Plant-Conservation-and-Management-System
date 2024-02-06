import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <>
    <div className='Header flex justify-between items-center content-center p-2 m-4 mx-8 flex-wrap'>
        <div className='flex flex-wrap justify-center items-center'>
            <img className='h-28'  src="https://shorturl.at/ilpLP"></img>
            <h4 className='ml-2 font-bold text-xl'>Plant Conservation And Management System</h4>

        </div>
        <div className=''>
            <ul className='flex flex-wrap *:m-4 text-xl'  >
                <Link><li>Home</li></Link>
                <Link to='/account'><li>Account</li></Link>
                <Link to="/Contribute"><li>Contribute</li></Link>
                <Link to='/GetDetails'><li>Get Details</li></Link>
            </ul>

        </div>
    </div>
    </>
  )
}

export default Header