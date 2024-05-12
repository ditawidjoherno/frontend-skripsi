import React from 'react';
import { IoTimeSharp } from "react-icons/io5";

const BoxProfil = ({ nama, image, nip, onClick }) => {
    return (
        <div className="sm:h-[150px] h-[180px] flex sm:gap-8 gap-1 items-center my-4 py-9 px-10 bg-white w-auto min-w-[40%] rounded-xl sm:ml-3 ml-1 pt-9 cursor-pointer" onClick={onClick} >
            <div className="flex flex-col font-medium sm:ml-0 ml-2 text-lg gap-2 sm:mt-4 mt-0">
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