import React from 'react';

const Button = ({ text, onClick, actionType }) => {
  return (
    <button onClick={() => onClick(actionType)}>
      <div className="sm:mt-10 mt-3">
        <div className="cursor-pointer bg-[#5293CE] items-center justify-center sm:w-[170px] sm:h-[40px] w-[85px] h-[35px] flex rounded-lg">
          <p className="sm:font-medium  text-white sm:text-lg text-xs text-semibold">{text}</p>
        </div>
      </div>
    </button>
  );
};

export default Button;
