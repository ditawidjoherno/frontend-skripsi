import React from 'react';

const ErrorMessage = ({ error, onClose }) => {
    let errorMessage = "Terjadi kesalahan.";
    if (error && error.response && error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-8 w-96">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
                <p className="text-gray-700">{errorMessage}</p>
                <div className="mt-6 flex justify-end">
                    <button onClick={onClose} className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:bg-red-700">Close</button>
                </div>
            </div>
        </div>
    );
};

export default ErrorMessage;
