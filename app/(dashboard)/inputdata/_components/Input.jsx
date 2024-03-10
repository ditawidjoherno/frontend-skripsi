import React from 'react';

const Input = ({ text, placeholder, value, onChange }) => {
    return (
        <div className='sm:px-10 pt-3'>
            <p className="text-black text-[20px] font-medium mb-1">
                {text}
            </p>
            <div className='flex gap-2 w-full px-5 py-1  bg-[#D9D9D9] items-center rounded-sm'>
                <input 
                    className='border-none outline-none w-full bg-transparent font-lightitalic' 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

export default Input;
