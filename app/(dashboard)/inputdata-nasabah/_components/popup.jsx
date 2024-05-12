import React from 'react';

const SuccessMessage = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <p className="text-black font-semibold">Data berhasil diperbarui!</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md" onClick={onClose}>
          Tutup
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
