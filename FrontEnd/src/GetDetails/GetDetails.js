import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const GetDetails = () => {
  const [details, setDetails] = useState([]);
  const [area, setArea] = useState('');
  const [fdata, setFdata] = useState([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/details");
        setDetails(response.data);
        setFdata(response.data); 
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };

    fetchDetails();
  }, []);

  const filterData = () => {
    const filteredData = details.filter((x) => x.area.toLowerCase().includes(area.toLowerCase()));
   
    setFdata(filteredData);
    setClick(true);
  };

  const handleClose = () => {
    setClick(false);

  };

  return (
    <>
      <div className='mx-20 h-[100vh] flex items-center justify-center'>
        <div className='h-[20rem] bg-gray-200 rounded-3xl flex justify-center items-center'>
          <form method='post' className='flex flex-col *:m-4' action='/GetDetails'>
            <div className='*:m-2'>
              <label htmlFor="AreaName">Enter Area Name</label>
              <input className='border border-black' type='text' id='AreaName' name='AreaName' onChange={(e) => setArea(e.target.value)} />
            </div>
            <div className='text-center'>
              <button type='button' onClick={filterData} className='m-2 rounded-lg p-2 bg-blue-400'>
                Get Details
              </button>
            </div>
          </form>
        </div>
      </div>

      {fdata.length < details.length && click &&
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30'>
          <div className='mx-auto w-[40rem] bg-white p-4 rounded-lg'>
            <button onClick={handleClose} className=' text-gray-500'>Close</button>
            {fdata.map((x) => (
              <div className='flex' key={x.id}>
                <div className='flex w-1/2'>
                  <h4>{x.plantname}</h4>
                </div>
                <div>
                  <h2>{x.age}</h2>
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
