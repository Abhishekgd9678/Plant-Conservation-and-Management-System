import React from "react";

const Contribute = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="h-[40rem] bg-gradient-to-r from-green-100 to-green-200 rounded-3xl">
        <form className="flex flex-col p-4 m-10 *:m-2" >
    
            <label for="UserName">Enter Your Name</label>
            <input
              className="border border-black"
              type="text"
              name="UserName"
            ></input>
     

          <label for="plant_name">Plant Name:</label>
          <input className="border border-black" type="text" id="plant_name" name="plant_name" required />

          <label for="age">Age:</label>
          <input type="number" id="age" name="age" required className="border border-black" />

          <label for="plant_location">Plant Location Area:</label>
          <select id="plant_location" name="plant_location" className="border border-black"  required>
            <option value="garden">Ashokapuram</option>
            <option value="indoor">Vidyaranyapuram</option>
            <option value="park">Kuvempu Nagar</option>
          </select>

          <label for="plant_picture">Upload Picture:</label>
          <input
            type="file"
            id="plant_picture"
            name="plant_picture"
            accept="image/*"
          />
<div className="flex justify-center">
<button type="submit" className="bg-green-500 h-[40px] w-[150px] rounded-xl ">Submit Details</button>
</div>
      
        </form>
      </div></div>)
};

export default Contribute;
