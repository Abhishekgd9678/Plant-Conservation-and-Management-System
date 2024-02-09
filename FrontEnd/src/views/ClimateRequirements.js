import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ClimateRequirements = ({id,setShowClimate}) => {
    const [climatedata,setClimateData] = useState();
    useEffect(()=>{
        getTaxon();
        console.log(id,setShowClimate);
    },[]);
    const getTaxon = async ()=>{
        const response = await axios.post('http://localhost:3000/getclimate',{
            id:id
        });
        setClimateData(response?.data[0])
        console.log("climate",response.data);
    }
  return (
    <>
    <div className='fixed w-full h-full flex justify-center mt-10'>
      <div className="w-[500px] h-[500px] flex flex-col gap-6 bg-black bg-opacity-80 m-3 p-6 rounded-lg text-white" >
          <div className="text-2xl font-semibold flex justify-between">
              <div>
                  Details
              </div>
          </div>
          <div className="flex justify-between" >
              <div>Sunlight</div><div>{climatedata?.sunlight} hours</div>
          </div>
          <div className="flex justify-between">
              <div>Humidity</div><div>{climatedata?.humidity}</div>
          </div>
          <div className="flex justify-between">
              <div>Temperature</div><div>{climatedata?.temperature} k</div>
          </div>       
          <div
          onClick={()=>{
              setShowClimate(false);
          }}
          >
              Done
          </div>
      </div>
    </div>
  </>
  )
}

export default ClimateRequirements