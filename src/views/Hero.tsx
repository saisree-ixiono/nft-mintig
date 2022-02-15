import React from 'react';
import { HeroInterface } from '../interfaces';
const Hero = (props: HeroInterface) => {
    const { data } = props;
    return (
        <div>
            <div className="hero bg-gray-900" style={{ height: '60vh' }}>
                <div className="text-center hero-content">
                    <div className="max-w-4xl">
                        <h1 className="mb-5 text-5xl font-bold">{data.title}</h1>
                        <p className="mb-5">{data.desc}</p>
                        <button className="btn text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Hero;
