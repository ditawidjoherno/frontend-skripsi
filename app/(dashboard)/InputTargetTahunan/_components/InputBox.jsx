// components/InputBox.js
import React from "react";

const InputBox = ({ months, onChange }) => {
  return (
    <div>
      {months.map((month) => (
        <input
          key={month}
          type="text"
          placeholder={`Enter value for ${month}`}
          onChange={(e) => onChange(month, e.target.value)}
        />
      ))}
    </div>
  );
};

export default InputBox;
