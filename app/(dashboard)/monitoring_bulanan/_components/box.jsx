"use client";
import { useRouter } from 'next/router';

const Box = ({ bgColor, icon, text, number }) => {

    const handleClick = () => {
        // Pindah ke halaman lain saat tombol diklik
        window.location.href = '/data_bulanan';
    };


    return (
        <button onClick={handleClick} className={`${bgColor} sm:h-[180px] sm:w-[400px] h-[120px]  w-full flex rounded-lg`}>
            <div className="w-full h-full flex-col sm:py-4 py-1 sm:pb-8 pb-4 ">
                <p className="text-white sm:text-3xl text-2xl flex justify-start sm:px-10 px-5 pt-2 font-semibold h-1/4">
                    {text}
                </p>
                <div className="flex justify-between items-center h-3/4 px-6">
                    <div className="h-full items-end flex sm:ml-7">
                        <p className="font-semibold sm:text-6xl text-5xl text-[#abc9d4]">
                            {number}
                        </p>
                    </div>
                    <div className="sm:mb-5 mb-10 text-8xl">{icon}</div>
                </div>
            </div>
        </button>
    );
};

export default Box;