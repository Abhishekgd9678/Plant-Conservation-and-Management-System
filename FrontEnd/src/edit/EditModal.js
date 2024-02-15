import axios from "axios";
import { useState } from "react";

function EditModal({setShow,updatedata}) {

    const [cname,setCname] = useState(updatedata.commonname);
    const [ucount,setUcount] = useState(updatedata.count);
    const [uage,setUage] = useState(updatedata.age);
    const [ulife,setUlife] = useState(updatedata.expected_lifetime);
    const [ulocation,setUlocation] = useState(updatedata.location);

    const handleUpdate =async ()=>{
        const response = await axios.post("http://localhost:3000/update",{
            name:cname,
            count:ucount,
            life:ulife,
            location:ulocation,
            age:uage,
            plantid:updatedata.plantid
        });
        if(response.data.updated)
            setShow(false);
    }

    const handleDelete =async ()=>{
        const response = await axios.post("http://localhost:3000/delete",{
            plantid:updatedata.plantid
        });
        if(response.data.deleted)
            setShow(false);
        else{
            alert(response.data.error);
        }
    }

  return(
    <>
      <div className='fixed w-full h-full flex justify-center mt-10'>
        <div className="w-[500px] h-[500px] flex flex-col gap-6 bg-black bg-opacity-80 m-3 p-6 rounded-lg text-white" >
            <div className="text-2xl font-semibold flex justify-between">
                <div>
                    Details
                </div>
                <button className="bg-red-600 px-2 text-xl rounded-lg"
                    onClick={()=>{
                        const reply = confirm("want to delete this plant data?");
                        if(reply){
                            handleDelete();
                        }
                    }}
                >
                    Delete
                </button>
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

export default EditModal;
