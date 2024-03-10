import { useState } from 'react';

const InputPopup = ({ onSave, onClose }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputData, setInputData] = useState({});
  const [popupSize, setPopupSize] = useState({ width: 480, height: 270 });

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
      setInputData((prevData) => {
        const { [option]: _, ...newData } = prevData;
        return newData;
      });
    } else {
      setSelectedOptions([...selectedOptions, option]);
      setInputData((prevData) => ({
        ...prevData,
        [option]: '',
      }));
    }
  };

  const handleInputChange = (e, option) => {
    const { value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [option]: value,
    }));
  };

  const handleSave = () => {
    onSave({ options: selectedOptions, inputData });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white mt-12 px-66 py-52 rounded shadow-lg" style={{ width: `${popupSize.width}px`, height: `${popupSize.height}px` }}>
        <div className="mb-4">
          {['Data 1', 'Data 2', 'Data 3'].map((option) => (
            <div key={option} className="mb-4">
              <div className="mb-2">
                <input
                  type="checkbox"
                  id={option}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <label htmlFor={option} className="ml-2">
                  {option}
                </label>
              </div>
              {selectedOptions.includes(option) && (
                <div className="mb-2">
                  <label className="text-sm">Januari</label>
                  <input
                    type="text"
                    value={inputData[option]}
                    onChange={(e) => handleInputChange(e, option)}
                    placeholder={`Masukkan data untuk ${option}`}
                    className="block mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              )}
              {selectedOptions.includes(option) && (
                <div className="mb-2">
                  <label className="text-sm">Februari</label>
                  <input
                    type="text"
                    value={inputData[option]}
                    onChange={(e) => handleInputChange(e, option)}
                    placeholder={`Masukkan data untuk ${option}`}
                    className="block mt-1 w-full rounded border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Simpan
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClose}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputPopup;
