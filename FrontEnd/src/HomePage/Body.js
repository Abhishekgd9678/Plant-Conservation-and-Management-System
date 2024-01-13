import React from "react";
import Features from "./features";
import Intro from "./Intro";
import Creators from "./Creators";
import Footer from "./Footer";


const Body = () => {
  return (
    <>
      <div className="mx-10">
       <Intro/>
        <div className=" mt-12  ">
          <div className="heading">
            <h3 className="text-2xl font-bold text-center">What Do we Offer</h3>
          </div>
        </div>
        <Features/>
      </div>
      <div>
        <Creators/>
      </div>
      <Footer/>

    </>
  );
};

export default Body;
