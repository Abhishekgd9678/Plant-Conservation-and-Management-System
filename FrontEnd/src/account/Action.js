import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Action = () => {
    
    const [data,setData] = useState();
    const [addcount,setAddCount] = useState()

    const [plantid,setPlantid] = useState();
    const [userid,setUserid] = useState();

    const navigate = useNavigate();

    useEffect(()=>{
        getMessage();
    },[])

    const addPlantCount =async ()=>{
        const response = await axios.post("http://localhost:3000/addplantcount",{
            count:addcount,
            userid:userid,
            plantid:plantid
        });
        if(response?.data?.sent){
            alert("Message sent to the User");
            removeMessage();
        }
    }

    const removeMessage =async ()=>{
        const response = await axios.get("http://localhost:3000/adminmessagedone");
        if(response?.data?.update){
            navigate('/adminprofile');
        }
    }
    
    const getMessage =async ()=>{
        const res= await axios.get("http://localhost:3000/adminmessage")
        getdata(res?.data[0]?.last_updated_plantid,res?.data[0]?.last_updated_userid);
        setPlantid(res?.data[0]?.last_updated_plantid);
        setUserid(res?.data[0]?.last_updated_userid);
    }

    const getdata =async (x,y)=>{
        const response = await axios.post("http://localhost:3000/getuserplantdata",{
            userid:x,
            plantid:y
        });
        console.log(response);
        setData(response?.data?.plantInfo[0]);
    }

  return (
    <div className='flex flex-col'>
    <div className='flex m-10'>
        <div className='flex flex-col p-2 gap-4'>
            <div className='text-3xl font-semibold'>
                PlantDetails
            </div>
            <div>
                <ul>
                    <li>Name: {data?.plant_info_scientificname}</li>
                    <li>Present Count: {data?.plant_count}</li>
                    {/* <li>Previous Count: {data}</li> */}
                </ul>
            </div>
        </div>
        <div  className='flex flex-col p-2 gap-4'>
            <div className='text-3xl font-semibold'>
                User Details
            </div>
            <div>
                <ul>
                    <li>User Id: {data?.user_data_id}</li>
                    <li>User Name: {data?.user_data_username}</li>
                </ul>
            </div>
        </div>
        </div>
        <div className='flex m-10 flex-col gap-4'>
            <div className='text-xl font-semibold'>
                How many plants the user has to plant ?
            </div>
            <div className='mx-4'>
                <input
                onChange={(e)=>{
                    setAddCount(e.target.value);
                }}
                className='px-2 w-72'
                placeholder='enter number of plants to be planted' />
            </div>
            <div>
                <button
                onClick={()=>{
                    addPlantCount();
                }}
                className="bg-blue-300 p-1 m-1 rounded-md">
                    Submit
                </button>
            </div>
        </div>
    </div>
  )
}

export default Action