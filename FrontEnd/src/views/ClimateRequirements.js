import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

const ClimateRequirements = ({ id, setShowClimate }) => {
    const [climatedata, setClimateData] = useState();

    useEffect(() => {
        getClimate();
    }, []);

    const getClimate = async () => {
        try {
            const response = await axios.post('http://localhost:3000/getclimate', { id });
            setClimateData(response?.data[0]);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const animationProps = useSpring({
        opacity: 1,
        transform: 'translateY(0)',
        from: { opacity: 0, transform: 'translateY(-50px)' },
    });

    return (
        <>
            <div className='fixed w-full h-full flex justify-center mt-10'>
                <animated.div style={animationProps} className="w-[500px] h-[500px] flex flex-col gap-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg text-white shadow-2xl p-6">
                    <div className="text-3xl font-bold text-center mb-4">
                        Climate Requirements
                    </div>
                    <div className="text-lg font-semibold flex justify-between">
                        <div>Sunlight</div><div>{climatedata?.sunlight} hours</div>
                    </div>
                    <div className="text-lg font-semibold flex justify-between">
                        <div>Humidity</div><div>{climatedata?.humidity}</div>
                    </div>
                    <div className="text-lg font-semibold flex justify-between">
                        <div>Temperature</div><div>{climatedata?.temperature} K</div>
                    </div>
                    <div className="text-lg font-semibold flex justify-center cursor-pointer hover:underline" onClick={() => setShowClimate(false)}>
                        Done
                    </div>
                </animated.div>
            </div>
        </>
    );
}

export default ClimateRequirements;
