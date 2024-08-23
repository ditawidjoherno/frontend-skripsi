import React from 'react';

const DateInput = ({ text, placeholder, ...props }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="TanggalLahir" className="text-black sm:text-[20px] text-[16px] font-medium sm:mb-1 -mb-2 sm:px-10 pt-3 ">
        {text}
      </label>
      <div className='sm:px-10 px-0 sm:mr-0 mr-4 pt-3'>
        <input
          type="date"
          id="dateOfBirth"
          placeholder={placeholder}
          className="flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm"
          {...props}
        />
      </div>
    </div>
  );
};

export default DateInput; 