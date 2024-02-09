import axios from "axios";
import { useState } from "react";

function EditUser({setShow,updatedata}) {

    const [upass,setUpass] = useState(updatedata.password);
    const [uusername,setUusername] = useState(updatedata.username);

    const handleUpdate =async ()=>{
        const response = await axios.post("http://localhost:3000/updateuser",{
            name:uusername,
            password:upass
        });
        if(response.data.updated)
            setShow(false);
    }

  return(
    <>
      <div className='fixed w-full h-full flex justify-center mt-10'>
        <div className="w-[500px] h-[500px] flex flex-col gap-6 bg-black bg-opacity-80 m-3 p-6 rounded-lg text-white" >
            <div className="text-2xl font-semibold flex justify-between">
                <div>
                    Details
                </div>
            </div>
            <div className="flex justify-between" >
                <label className="text-xl m-1 p-1" >Age</label>
                <input name="count" value={uage}
                onChange={(e)=>{
                    setUage(e.target.value);
                }}
                className="border border-gray-300 border-opacity-90 rounded-md m-1 p-1  text-black" />
            </div>
            <div className="flex justify-between">
                <label className="text-xl m-1 p-1" >Expected lifetime</label>
                <input name="count" value={ulife} 
                onChange={(e)=>{
                    setUlife(e.target.value);
                }}
                className="border border-gray-300 border-opacity-90 rounded-md m-1 p-1  text-black" />
            </div>
            <div className="flex justify-between">
                <label className="text-xl m-1 p-1" >Count</label>
                <input name="count" value={ucount} 
                onChange={(e)=>{
                    setUcount(e.target.value);
                }}
                className="border border-gray-300 border-opacity-90 rounded-md m-1 p-1  text-black" />
            </div>
            <div className="flex justify-between">
                <label className="text-xl m-1 p-1" >Common Name</label>
                <input name="count" value={cname} 
                onChange={(e)=>{
                    setCname(e.target.value);
                }}
                className="border border-gray-300 border-opacity-90 rounded-md m-1 p-1  text-black" />
            </div>
            <div className="flex justify-between">
                <label className="text-xl m-1 p-1" >Location</label>
                <input name="count" value={ulocation} 
                onChange={(e)=>{
                    setUlocation(e.target.value);
                }}
                className="border border-gray-300 border-opacity-90 rounded-md m-1 p-1  text-black" />
            </div>
            <div
            onClick={()=>{
                handleUpdate();
            }}
            >
                Update
            </div>
        </div>
      </div>
    </>
  )
}

export default EditUser;
