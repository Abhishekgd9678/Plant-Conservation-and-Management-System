import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetDetails = () => {
  const [details, setDetails] = useState([]);
  const [area, setArea] = useState('');
  const [fdata, setFdata] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    getAllinfo();
  }, []);

  const getAllinfo =async ()=>{
    const response = await axios.get("http://localhost:3000/details");
    console.log(response.data);
    setFdata(response.data);
  }

  const filterData =async () => {
      try {
        const response = await axios.post("http://localhost:3000/filter",{
          area:area
        });
        setDetails(response.data);
        setFdata(response.data); 
      } catch (error) {
        console.error('Error fetching details:', error);
      }
  };

  const handleClose = () => {

  };

  return (
    <>
      <div className='mx-20 flex'>
        <div className='bg-gray-200 rounded-3xl flex justify-center items-center'>
          <form method='post' className='flex flex-col *:m-4' action='/GetDetails'>
            <div className='*:m-2'>
              <label htmlFor="AreaName">Enter Area Name</label>
              <input className='border border-black' type='text' id='AreaName' name='AreaName' onChange={(e) => setArea(e.target.value)} />
              <button type='button' onClick={filterData} className='m-2 rounded-lg p-2 bg-blue-400'>
                Get Details
              </button>
            </div>
          </form>
        </div>
      </div>

      {fdata.length &&
        <div className=' top-0 left-0 w-full h-full flex items-center justify-center'>
          <div className='mx-auto w-[40rem] bg-white p-4 rounded-lg'>
            <div className='flex w-full justify-evenly text-xl font-semibold '>
              <div><h1>Sl.no</h1></div>
              <div><h1>Scientific name</h1></div>
              <div><h1>Age</h1></div>
              <div><h1>Common Name</h1></div>
              <div><h1>Genus</h1></div>
              <div><h1>Location</h1></div>
              <div><h1>Finder</h1></div>
            </div>
            {fdata.map((x) => (
              <div className='flex justify-evenly' key={x?.plantid}>
                <div className=''>
                  <h4>{x?.plantid}</h4>
                </div>
                <div>
                  <h2>{x?.plant_scientific_name}</h2> 
                </div>
                <div>
                  <h2>{x?.age}</h2> 
                </div>
                <div>
                  <h2>{x?.common_name}</h2> 
                </div>
                <div>
                  <h2>{x?.genus}</h2> 
                </div>
                <div>
                  <h2>{x?.location}</h2> 
                </div>
                <div>
                  <h2>{x?.username}</h2> 
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    </>
  );
};

export default GetDetails;
