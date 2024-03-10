import { useState } from 'react';
import { IoCaretUp } from "react-icons/io5";
import { IoCaretDown } from "react-icons/io5";
import Link from 'next/link';


const Menu = ({ title, description }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="my-4">
            <div
                className="bg-[#056AAA]  p-4 rounded-t-md cursor-pointer transition-opacity"
                onClick={toggleDropdown}
            >
                <h3 className="text-lg font-bold text-[#FFE500] text-center py-">{title}</h3>
                <div className='flex items-center justify-center'>
                    {isOpen ? <IoCaretUp size={20} /> : <IoCaretDown size={20} />}
                </div>
            </div>
            {isOpen && (

                <div className="mt- grid-cols-2 gap-4 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}">
                    <Link href="/data-mingguan">
                        <div className="bg-[#248CCE] text-white p-2 hover:bg-blue-600 transition duration-300 cursor-pointer">
                            <p>Minggu Pertama:</p>
                            <p>Jumlah:</p>
                        </div>
                    </Link>
                    <Link href="/data-mingguan">
                        <div className="bg-[#056AAA] text-white p-2  hover:bg-blue-600 transition duration-300 cursor-pointer">
                        <p>Minggu Pertama:</p>
                            <p>Jumlah:</p>
                        </div>
                    </Link>
                    <Link href="/data-mingguan">
                        <div className="bg-[#248CCE] text-white p-2  hover:bg-blue-600 transition duration-300 cursor-pointer">
                        <p>Minggu Pertama:</p>
                            <p>Jumlah:</p>
                        </div>
                    </Link>
                    <Link href="/data-mingguan">
                        <div className="bg-[#056AAA] text-white p-2  hover:bg-blue-600 transition duration-300 cursor-pointer">
                        <p>Minggu Pertama:</p>
                            <p>Jumlah:</p>
                        </div>
                    </Link>
                    <Link href="/data-mingguan">
                        <div className="bg-[#248CCE] text-white p-2 rounded-b-md hover:bg-blue-600 transition duration-300 cursor-pointer">
                        <p>Minggu Pertama:</p>
                            <p>Jumlah:</p>
                        </div>
                    </Link>
                </div>

            )}
        </div>
    );
};

export default Menu;
