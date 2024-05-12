import React from 'react';

const Button = ({ text, onClick }) => {
  return (
    <div className="sm:mt-2">
      <div className="cursor-pointer sm:bg-[#5293CE] hover:bg-blue-400 items-center justify-center w-[120px] h-[35px] flex rounded-sm" onClick={onClick}>
        <p className="font-medium text-white text-sm">{text}</p>
      </div>
    </div>
  );
};

export default Button;