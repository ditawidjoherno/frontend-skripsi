import React from 'react';

const Input = ({ text, placeholder, value, onChange, disabled }) => {
    return (
        <div className='sm:px-10 pt-3'>
            <p className="text-black sm:text-[20px] text-[14px] font-medium mb-1">
                {text}
            </p>
            <div className='flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm '>
                <input 
                    className='border-none outline-none w-full bg-transparent font-lightitalic' 
                    placeholder={placeholder} 
                    value={value} 
                    onChange={onChange}
                    disabled={disabled} 
                    style={{ opacity: disabled ? 0.6 : 1 }} 
                />
            </div>
        </div>
    );
};

export default Input;
