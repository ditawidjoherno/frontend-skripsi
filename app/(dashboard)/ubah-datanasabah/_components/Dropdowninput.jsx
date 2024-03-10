const Dropdown = ({ options, onSelectOption }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelectOption(option); 
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Pilih opsi"
        value={selectedOption || ''}
        readOnly
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
      />
      <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleSelectOption(option)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};