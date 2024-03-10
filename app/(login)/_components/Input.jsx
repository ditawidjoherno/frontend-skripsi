import React, { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

const Input = ({ type, Icon, placeholder }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='relative'>
            <div className='flex gap-2 w-full px-2 py-1 bg-[#D9D9D9] items-center rounded-xl mt-[15px]'>
                {Icon}
                <input
                    type={showPassword ? 'text' : type}
                    className='border-none outline-none bg-transparent font-lightitalic w-full'
                    placeholder={placeholder}
                />
            </div>
            {type === 'password' && (
                <button
                    onClick={togglePasswordVisibility}
                    className='absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none'
                >
                    {showPassword ? (
                        <IoEyeOffOutline size={20} className='text-gray-500 cursor-pointer' />
                    ) : (
                        <IoEyeOutline size={20} className='text-blue-500 cursor-pointer' />
                    )}
                </button>
            )}
        </div>
    );
};

export default Input;
