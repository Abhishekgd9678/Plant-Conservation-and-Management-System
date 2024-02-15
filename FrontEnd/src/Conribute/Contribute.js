import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import run from "../Geminisearch";
import loader from "../../images/icegif-1262.gif";
import background0 from "../../images/bg.jpg"; 
import background from "../../images/profile.png"; 

const Contribute = () => {
  const navigate = useNavigate();
  const userpresent = useSelector(store => store.user);

  useEffect(() => {
    if (!userpresent) {
      navigate('/log');
    }
  });

  const [load, setLoad] = useState(false);
  const [plantname, setPlantName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [commonname, setCommonName] = useState("");
  const [expectedlifetime, setExpectedLifeTime] = useState("");
  const [count, setCount] = useState("");
  const [msg, setMsg] = useState("");

  const senddata = async () => {
    if (plantname && age && location && commonname && expectedlifetime && count) {
      try {
        setLoad(true);
        const response = await axios.post("http://localhost:3000/details", {
          plantname,
          commonname,
          age,
          count,
          location,
          expectedlifetime,
          userid: userpresent.userid
        });
        if (response.data.error) {
          alert(response.data.error);
          setLoad(false);
          return;
        }
        let taxon = await run(`Provide the information of ${plantname}. The response should be in the form of a JSON object with the following keys: 'Kingdom', 'Family', 'Phylum', and 'Class'. Ensure there are no additional words or characters in the response.`);
        let image = await run(`Provide image of ${plantname}, no texts needed just image`);
        taxon = taxon.replace('```', '').replace('```', '').replace('json', '');
        const jsonData = JSON.parse(taxon);
        const taxonres = await axios.post("http://localhost:3000/taxon", { jsonData, id: response.data });
        if (taxonres) {
          setLoad(false);
          navigate('/account');
        }
      } catch (error) {
        console.error("Error:", error.message);
        setMsg("An error occurred while submitting the form. Please try again.");
        setLoad(false);
      }
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <>
      {load && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex justify-center items-center">
          <img className="w-52 h-20" src={loader} alt="Loading..." />
        </div>
      )}
      <div className="h-screen flex justify-center items-center bg-cover rounded-lg " style={{backgroundImage: `url(${background0})`}}>
        <div className="h-[40rem]  w-1/4 rounded-3xl  bg-green-100 opacity-[0.9] shadow-lg p-8">
          <form className="flex flex-col gap-4">
            <label htmlFor="plant_name" className="text-lg">Plant Name:</label>
            <input type="text" id="plant_name" name="plant_name" className="border border-black p-2 rounded-md" required onChange={(e) => setPlantName(e.target.value)} value={plantname} />

            <label htmlFor="age" className="text-lg">Age:</label>
            <input type="number" id="age" name="age" className="border border-black p-2 rounded-md" required onChange={(e) => setAge(e.target.value)} value={age} />

            <label htmlFor="count" className="text-lg">Count:</label>
            <input type="number" id="count" name="count" className="border border-black p-2 rounded-md" required onChange={(e) => setCount(e.target.value)} value={count} />

            <label htmlFor="common_name" className="text-lg">Common Name:</label>
            <input type="text" id="common_name" name="common_name" className="border border-black p-2 rounded-md" required onChange={(e) => setCommonName(e.target.value)} value={commonname} />

            <label htmlFor="expected_lifetime" className="text-lg">Expected Lifetime:</label>
            <input type="number" id="expected_lifetime" name="expected_lifetime" className="border border-black p-2 rounded-md" required onChange={(e) => setExpectedLifeTime(e.target.value)} value={expectedlifetime} />

            <label htmlFor="plant_location" className="text-lg">Plant Location Area:</label>
            <select id="plant_location" name="plant_location" className="border border-black p-2 rounded-md" required onChange={(e) => setLocation(e.target.value)} value={location}>
              <option value="">Select Location</option>
              <option value="Ashokapuram">Ashokapuram</option>
              <option value="Vidyaranyapuram">Vidyaranyapuram</option>
              <option value="Kuvempu Nagar">Kuvempu Nagar</option>
            </select>
            <div className="flex justify-center">
              <button onClick={(e) => { e.preventDefault(); senddata(); }} className="bg-green-500 h-[40px] w-[150px] rounded-xl hover:bg-green-600 transition duration-300 text-white font-bold">Submit Details</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contribute;
