import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'


const PlantData = () => {
    const {id} = useParams();
    useEffect(()=>{
        getdata();
    },[]);

    const getdata =async ()=>{
        const response =await axios.post("http://localhost:3000/plantdata",{
            id:id
        });
        console.log(response.data);
    }
  return (
    <div>
        <div>
          <h1>Plant</h1>
          {response[0]?.scientificname}
        </div>
    </div>
  )
}

export default PlantData