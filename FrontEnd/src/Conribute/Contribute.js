import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import run from "../Geminisearch";

const Contribute = () => {
  const navigate = useNavigate();
  const userpresent = useSelector(store=>store.user);

  useEffect(()=>{
    if(!userpresent){
      navigate('/log');
    }
  })

  const [plantname, setplantname] = useState("");
  const [age, setage] = useState("");
  const [location, setlocation] = useState("");
  const [commonname,setCommonName] = useState();
  const [expectedlifetime,setExpectedLifeTime] = useState();
  const [count,setCount] = useState();
  const [msg, setmsg] = useState("");

  const senddata = async (e) => {
    e.preventDefault();
    if (plantname &&  age && location && commonname && expectedlifetime && count) {
      console.log("entered");
    try {
      const response = await axios.post("http://localhost:3000/details", {
        plantname:plantname,
        commonname:commonname,
        age:age,
        count:count,
        location:location,
        expectedlifetime:expectedlifetime,
        userid:userpresent.userid
      }).then(async(response)=>{
        console.log("response",response);
        let taxon = await run(`Give the Kingdom,family,phylum,class of ${plantname} in the form of a json object without any extra words`);
        console.log(taxon);
        taxon = taxon.replace('```','');
        taxon = taxon.replace('```','');
        const jsonData = JSON.parse(taxon);
        const taxonres = await axios.post("http://localhost:3000/taxon",{jsonData,id:response.data})
      })
    } catch (error) {
      console.error("Error:", error.message);
      setmsg("An error occurred while submitting the form. Please try again.");
    }
  }
  else{
    alert("fill all");
  }
}

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="h-[40rem] bg-gradient-to-r from-green-100 to-green-200 rounded-3xl">
        <form className="flex flex-col p-4 m-10 *:m-2">
          <label>Plant Name:</label>
          <input
            className="border border-black p-1"
            type="text"
            id="plant_name"
            name="plant_name"
            required
            onChange={(e) => setplantname(e.target.value)}
            value={plantname}
          />
      
          <label>Age:</label>
          <input
            type="number"
            name="age"
            required
            className="border border-black p-1"
            onChange={(e) => setage(e.target.value)}
          />

          <label>Count:</label>
          <input
            type="number"
            name="commonname"
            required
            className="border border-black p-1"
            onChange={(e) => setCount(e.target.value)}
          />

          <label>Common Name:</label>
          <input
            type="text"
            name="commonname"
            required
            className="border border-black p-1"
            onChange={(e) => setCommonName(e.target.value)}
          />

          <label>Expected Lifetime:</label>
          <input
            type="number"
            name="expectedlife"
            required
            className="border border-black p-1"
            onChange={(e) => setExpectedLifeTime(e.target.value)}
          />

          <label htmlFor="plant_location">Plant Location Area:</label>
          <select
            id="plant_location"
            name="plant_location"
            className="border border-black p-1"
            onChange={(e) => setlocation(e.target.value)}
            required
          >
            <option value="">Select Location</option>
            <option value="Ashokapuram">Ashokapuram</option>
            <option value="Vidyaranyapuram">Vidyaranyapuram</option>
            <option value="Kuvempu Nagar">Kuvempu Nagar</option>
          </select>

          <label htmlFor="plant_picture">Upload Picture:</label>
          <input
            type="file"
            id="plant_picture"
            name="plant_picture"
            accept="image/*"
          />
          <div className="flex justify-center">
            <button
              onClick={senddata}
              className="bg-green-500 h-[40px] w-[150px] rounded-xl"
            >
              Submit Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contribute; 
