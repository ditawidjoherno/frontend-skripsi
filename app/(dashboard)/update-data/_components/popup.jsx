import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const SuccessMessage = ({ id }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = async () => {
    setIsLoading(true);
    await router.push(`/detail-aktivitas/${id}`);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-md shadow-md">
        <p className="text-green-500 font-bold text-lg mb-2">Berhasil!</p>
        <p className="text-black font-semibold">Data berhasil diperbarui!</p>
        <button
          className={`mt-4 py-2 px-4 rounded-md ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'
          }`}
          onClick={handleClose}
          disabled={isLoading}
        >
          {isLoading ? 'Mengalihkan...' : 'Tutup'}
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
