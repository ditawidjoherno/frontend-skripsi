import React from 'react';
import Select from 'react-select';

const Dropdown = ({ text, options, onChange, value, placeholder }) => {

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#D9D9D9',
    }),
  };

  return (
    <div className="flex flex-col sm:mr-0 mr-3">
      <label htmlFor="dropdown" className="text-black sm:text-[25px] text-[20px] font-medium sm:mb-1 mb-2 sm:px-10 sm:pt-0 pt- ">
        {text}
      </label>
      <div className='sm:px-10 pt '>
        <Select
          id="dropdown"
          value={options.find(option => option.value === value)}
          onChange={onChange}
          options={options}
          isSearchable={true} 
          placeholder={placeholder}
          styles={customStyles}
        />
      </div>
    </div>
  );
};

export default Dropdown;