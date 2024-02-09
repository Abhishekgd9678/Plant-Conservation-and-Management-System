import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TaxonView = ({id,setShowtaxon}) => {
    const [taxondata,setTaxonData] = useState();
    useEffect(()=>{
        getTaxon();
        console.log(id,setShowtaxon);
    },[]);
    const getTaxon = async ()=>{
        const response = await axios.post('http://localhost:3000/gettaxon',{
            id:id
        });
        setTaxonData(response?.data[0])
        console.log(response.data);
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
              <div>Kingdom</div><div>{taxondata?.kingdom}</div>
          </div>
          <div className="flex justify-between">
              <div>Family</div><div>{taxondata?.family}</div>
          </div>
          <div className="flex justify-between">
              <div>Phylum</div><div>{taxondata?.phylum}</div>
          </div>
          <div className="flex justify-between">
              <div>Class</div><div>{taxondata?.class}</div>
          </div>
          
          <div
          onClick={()=>{
            setShowtaxon(false);
          }} 
          >
              Done
          </div>
      </div>
    </div>
  </>
  )
}

export default TaxonView