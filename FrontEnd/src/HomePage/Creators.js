import React from 'react'
import one from "../../images/1.jpg"
import two from "../../images/2.jpg"

const Creators = () => {
  return (
    <div className='creators'>
        <div className='font-bold text-2xl text-center m-4 my-6'>
            <h4 >Who Are We ? </h4>
     </div>
    <div className='flex mx-10 my-20'>
        <div className='w-1/2 flex flex-col justify-center'>
            <div className='flex justify-center'>
            <img className='h-[20rem]' src={one}></img>
            </div>
        
            <h1 className='mt-4 text-center font-bold text-2xl'>Ajay S Biradar</h1>
       
          
           
        </div>
        <div className='w-1/2 flex flex-col justify-center'>
            <div className='flex justify-center'>
            <img className='h-[20rem]' src={two}></img>
            </div>
            <div className=''>
            <h1 className='mt-4 text-center font-bold text-2xl'>Abhishek G Durgad</h1>
            </div>
            
       
          
           
        </div>
       
    </div>
            
         
    </div>
  )
}

export default Creators