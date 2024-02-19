// DateInput.js

import React from 'react';

const DateInput = ({ text, placeholder }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="TanggalLahir" className="text-black sm:text-[20px] text-2xl font-medium mb-1 sm:px-10 pt-3">
        {text}
      </label>
      <div className='sm:px-10 pt-3'>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          placeholder={placeholder}
          className="flex gap-2 w-full px-5 py-1 bg-[#D9D9D9] items-center rounded-sm"
        />
      </div>
    </div>
  );
};

export default DateInput;
