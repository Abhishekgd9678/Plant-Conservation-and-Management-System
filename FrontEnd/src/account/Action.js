import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Action = () => {
    
    const [udata,setUdata] = useState();
    const [pdata,setPdata] = useState();
    const [addcount,setAddCount] = useState()
    const [prevcount,setPrevcount] = useState();
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
        const res= await axios.get("http://localhost:3000/adminmessage");
        console.log(res.data);
        setPrevcount(res?.data[0]?.prevcount);
        getdata(res?.data[0]?.last_updated_plantid,res?.data[0]?.last_updated_userid);
        setPlantid(res?.data[0]?.last_updated_plantid);
        setUserid(res?.data[0]?.last_updated_userid);
    }

    const getdata =async (x,y)=>{
        const response1 = await axios.post("http://localhost:3000/getplantdata",{
            plantid:x
        });
        console.log(response1?.data[0]);
        setPdata(response1?.data[0]);
        const response2 = await axios.post("http://localhost:3000/getuserdata",{
            userid:y
        });
        console.log(response2?.data[0]);
        setUdata(response2?.data[0]);
        console.log(response2);
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
                    <li>Name: {pdata?.scientificname}</li>
                    <li>Present Count: {pdata?.count}</li>
                    <li>Previous Count: {prevcount}</li>
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
                    <li>User Id: {udata?.userid}</li>
                    <li>User Name: {udata?.username}</li>
                </ul>
            </div>
        </div>
        </div>
        <div className='p-4 mx-10 text-xl text-red-300'>
            So totally there is a reduction of {prevcount-pdata?.count} plants.
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