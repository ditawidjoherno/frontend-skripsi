"use client";
import { useRouter } from 'next/router';

const Box = ({ bgColor, icon, text, number, bulan }) => {

    const lowerCaseBulan = bulan.toLowerCase();
    const handleClick = () => {
        window.location.href = `/data-bulan?bulan=${bulan}`;
    }
    return (
        <button onClick={handleClick} className={`${bgColor} sm:h-[180px] sm:w-full h-[90px]  w-full flex rounded-lg`}>
            <div className="w-full h-full flex-col sm:py-4 py-1 sm:pb-8 pb-4 ">
                <p className="text-white sm:text-3xl text-base flex justify-start sm:px-10 px-5 sm:pt-2 pt-1 font-semibold h-1/4">
                    {text}
                </p>
                <div className="flex justify-between items-center h-3/4 sm:px-6 px-4">
                    <div className="h-full items-end flex sm:ml-7">
                        <p className="font-semibold sm:text-6xl text-3xl text-[#abc9d4]">
                            {number}
                        </p>
                    </div>
                    <div className="sm:mb-5 mb-6 sm:text-8xl text-4xl">{icon}</div>
                </div>
            </div>
        </button>
    );
};

export default Box;