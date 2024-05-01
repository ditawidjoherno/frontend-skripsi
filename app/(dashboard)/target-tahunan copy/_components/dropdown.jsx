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
    <div className="flex flex-col">
      <div className='w-full h-[40px]'>
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

