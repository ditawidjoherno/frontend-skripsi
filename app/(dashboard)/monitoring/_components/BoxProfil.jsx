import React from 'react';
import { IoTimeSharp } from "react-icons/io5";

const BoxProfil = ({ nama, image, nip, onClick, className }) => {
    return (
        <div className={`sm:h-[150px] h-[180px] flex sm:gap-8 gap-1 items-center py-9 px-10 bg-white w-auto min-w-[40%] rounded-xl sm:ml-3 ml-1 pt-9 cursor-pointer ${className}`} onClick={onClick} >
            <img className="sm:h-[130px] h-[115px] sm:w-[120px] w-[100px] sm:ml-0 ml-[-15px]" src={image} />
            <div className="flex flex-col font-medium sm:ml-0 ml-2 sm:text-lg text-md gap-2 sm:mt-4 mt-0">
                <p>
                    Nama: {nama}
                </p>
                <p>
                    NIP: {nip}
                </p>
            </div>
        </div>
    );
};

export default BoxProfil;