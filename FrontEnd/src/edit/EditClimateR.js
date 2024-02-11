import axios from "axios";
import { useEffect, useState } from "react";

function EditClimate({setShowClimateUpdate,id}) {

    const [sunlight,setSunlight] = useState();
    const [humidity,setHumidity] = useState();
    const [temp,setTemp] = useState();

    useEffect(()=>{
        getClimateData();
    },[]);

    const getClimateData =async ()=>{
        const response = await axios.post("http://localhost:3000/getclimate",{
            id:id
        });
        console.log(response.data[0]);
    }

    const handleUpdate =async ()=>{
        const response = await axios.post("http://localhost:3000/updateclimate",{
            id:id,
            sunlight:sunlight,
            humidity:humidity,
            temperature:temp
        });
        if(response.data.updated)
        setShowClimateUpdate(false);
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
                <label className="text-xl m-1 p-1" >Sunlight Eposure Needed</label>
                <input name="name" value={sunlight}
                onChange={(e)=>{
                    setSunlight(e.target.value);
                }}
                className="border border-gray-300 border-opacity-90 rounded-md m-1 p-1  text-black" />
            </div>
            <div className="flex justify-between">
                <label className="text-xl m-1 p-1" >Humidity</label>
                <input name="password" value={humidity} 
                onChange={(e)=>{
                    setHumidity(e.target.value);
                }}
                className="border border-gray-300 border-opacity-90 rounded-md m-1 p-1  text-black" />
            </div>
            <div className="flex justify-between">
                <label className="text-xl m-1 p-1" >Temperature</label>
                <input name="password" value={temp} 
                onChange={(e)=>{
                    setTemp(e.target.value);
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
            <div
            onClick={()=>{
                setShowClimateUpdate(false);
            }}
            >
                Cancel
            </div>
        </div>
      </div>
    </>
  )
}

export default EditClimate;
