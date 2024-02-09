import axios from "axios";
import { useState } from "react";

function EditUser({setShow,updatedata}) {

    const [upass,setUpass] = useState(updatedata.password);
    const [uusername,setUusername] = useState(updatedata.username);

    const handleUpdate =async ()=>{
        const response = await axios.post("http://localhost:3000/updateuser",{
            id:updatedata.userid,
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
                <label className="text-xl m-1 p-1" >Name</label>
                <input name="name" value={uusername}
                onChange={(e)=>{
                    setUusername(e.target.value);
                }}
                className="border border-gray-300 border-opacity-90 rounded-md m-1 p-1  text-black" />
            </div>
            <div className="flex justify-between">
                <label className="text-xl m-1 p-1" >New Password</label>
                <input name="password" value={upass} 
                onChange={(e)=>{
                    setUpass(e.target.value);
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
