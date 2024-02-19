import React from 'react';

const Button = ({ text, onClick, actionType }) => {
  return (
    <button onClick={() => onClick(actionType)}>
      <div className="sm:mt-10 mt-1">
        <div className="cursor-pointer sm:bg-[#5293CE] items-center justify-center w-[170px] h-[40px] flex rounded-lg">
          <p className="font-medium text-white text-semibold">{text}</p>
        </div>
      </div>
    </button>
  );
};

export default Button;
