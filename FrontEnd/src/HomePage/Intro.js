import React from 'react'

const Intro = () => {
  return (
    <div className="flex  flex-wrap">
    <div className=" flex justify-center items-center w-[50%]">
      <img
        className=""
        src="https://images.pexels.com/photos/1250260/pexels-photo-1250260.jpeg"
      />
    </div>
    <div className="w-1/2 flex items-center justify-center">
      <h1 className=" px-4 text-xl text-center ">
        Welcome to our Plant Conservation and Management System, a
        cutting-edge database project dedicated to the preservation and
        sustainable management of plant species
      </h1>
    </div>
  </div>
  )
}

export default Intro