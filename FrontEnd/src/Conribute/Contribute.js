import React, { useState } from "react";
import axios from 'axios';

const Contribute = () => {
  const [plantname, setplantname] = useState("");
  const [age, setage] = useState("");
  const [location, setlocation] = useState("");
  const [msg, setmsg] = useState("");

  const senddata = async (e) => {
    e.preventDefault();

   
    if (!plantname || !age || !location) {
      setmsg("Please fill in all the fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/details", {
        plantname,
        age,
        location,
      });

      console.log(response.data);
      setmsg(response.data);

     
      setTimeout(() => {
        setmsg("");
      }, 3000);

   
      setplantname("");
      setage("");
      setlocation("");
    } catch (error) {
      console.error("Error:", error.message);

     
      setmsg("An error occurred while submitting the form. Please try again.");
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="h-[40rem] bg-gradient-to-r from-green-100 to-green-200 rounded-3xl">
        <form className="flex flex-col p-4 m-10 *:m-2">
          <label htmlFor="plant_name">Plant Name:</label>
          <input
            className="border border-black"
            type="text"
            id="plant_name"
            name="plant_name"
            required
            onChange={(e) => setplantname(e.target.value)}
            value={plantname}
          />

          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            required
            className="border border-black"
            onChange={(e) => setage(e.target.value)}
            value={age}
          />

          <label htmlFor="plant_location">Plant Location Area:</label>
          <select
            id="plant_location"
            name="plant_location"
            className="border border-black"
            onChange={(e) => setlocation(e.target.value)}
            required
            value={location}
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
              type="submit"
              onClick={senddata}
              className="bg-green-500 h-[40px] w-[150px] rounded-xl"
            >
              Submit Details
            </button>
          </div>
        </form>
        <div>
          <h4 className="text-center">{msg}</h4>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
