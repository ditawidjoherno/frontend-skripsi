import { useState } from 'react';
import { IoCaretUp } from "react-icons/io5";
import { IoCaretDown } from "react-icons/io5";



const MenuItem = ({ title, description }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="my-4">
            <div
                className="bg-[#40a3d86e] text-black p-4 rounded-md cursor-pointer"
                onClick={toggleDropdown}
            >
                <h3 className="text-lg font-medium text-center py-3">{title}</h3>
                <div className='flex items-center justify-center'>
                    {isOpen ? <IoCaretUp size={20} /> : <IoCaretDown size={20} />}
                </div>
            </div>
            {isOpen && (
                <div className="bg-white text-gray-800 p-2 rounded-md shadow-md">
                    <p>{description}</p>
                </div>
            )}
        </div>
    );
};

export default MenuItem;
