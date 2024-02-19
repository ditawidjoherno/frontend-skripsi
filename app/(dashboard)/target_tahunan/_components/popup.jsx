// components/InputPopup.js
import React, { useState } from 'react';

const InputPopup = ({ onSave }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    onSave(inputValue);
    setInputValue('');
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md">
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleSave}>Simpan</button>
      </div>
    </div>
  );
};

export default InputPopup;
